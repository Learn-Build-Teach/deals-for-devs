'use server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { redirect } from 'next/navigation'
import { createValidateEmailLink, createConfirmEmailLink } from '@/lib/utils'
import { createSubscriber } from '@/lib/queries'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribe = async (formData: FormData) => {
  let parsed

  // create unique token
  const token = uuidv4()

  // parse the email
  parsed = subscribeSchema.parse({ email: formData.get('email') })

  const newSubscriber = {
    email: parsed.email,
    token: token,
    courseNotifications: true,
    ebookNotifications: true,
    miscNotifications: true,
    officeEquipmentNotifications: true,
    toolNotifications: true,
    conferenceNotifications: true,
  }

  //TODO check if email is already in the database first

  // add new subscriber to the database
  await createSubscriber(newSubscriber)

  // send confirmation email using resend
  const validateEmailLink = createValidateEmailLink(token)
  sendConfirmationEmail(parsed.email, validateEmailLink)

  // route subscriber to confirm page
  const confirmEmailLink = createConfirmEmailLink(token)
  redirect(confirmEmailLink)
}
