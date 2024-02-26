'use server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { redirect } from 'next/navigation'
import { createValidateEmailLink, createConfirmEmailLink } from '@/lib/utils'
import {
  createSubscriber,
  getOneSubscriberByEmail,
  getOneSubscriberByToken,
} from '@/lib/queries'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribe = async (formData: FormData) => {
  let parsed

  // create unique token
  const token = uuidv4()
  try {
    // parse the email
    parsed = subscribeSchema.parse({ email: formData.get('email') })

    const existingSubscriber = await getOneSubscriberByEmail(parsed.email)
    if (existingSubscriber) {
      console.log('Subscriber exists')
      return {
        error: 'This email already exists',
      }
    }

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
    await createSubscriber(newSubscriber)

    // send confirmation email using resend
    const validateEmailLink = createValidateEmailLink(token)
    await sendConfirmationEmail(parsed.email, validateEmailLink)
    return { data: token }
  } catch (error) {
    //TODO: handle specific errors
    console.error(error)
    return { error: 'Failed to send confirmation email.' }
  }
}
