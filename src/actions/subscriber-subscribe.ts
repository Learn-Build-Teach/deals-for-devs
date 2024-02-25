'use server'
import { getXataClient } from '@/xata'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { redirect } from 'next/navigation'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribe = async (formData: FormData) => {
  let parsed

  // get the base URL
  const baseUrl = process.env.BASE_URL

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

  // add new subscriber to the database
  const xataClient = getXataClient()
  await xataClient.db.subscribers.create(newSubscriber)

  // send email confirmation email using resend
  // create link
  const link = `${baseUrl}/validate?token=${token}`

  // send email
  sendConfirmationEmail(parsed.email, link)

  // route subscriber to confirm page
  redirect(`${baseUrl}/confirm/${token}`)
}
