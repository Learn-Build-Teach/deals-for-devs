'use server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { createValidateEmailLink, createConfirmEmailLink } from '@/lib/utils'
import { createSubscriber, getOneSubscriberByEmail } from '@/lib/queries'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribe = async (formData: FormData) => {
  try {
    const token = uuidv4()

    // parse the email
    const parsed = subscribeSchema.safeParse({ email: formData.get('email') })
    if (!parsed.success) return { error: parsed.error.message }
    const checkedEmail = parsed.data.email.toLowerCase()

    const existingSubscriber = await getOneSubscriberByEmail(checkedEmail)
    if (existingSubscriber) {
      console.log('Subscriber exists')
      return {
        error: 'This email already exists',
      }
    }

    const newSubscriber = {
      email: checkedEmail,
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
    const { error } = await sendConfirmationEmail(
      checkedEmail,
      validateEmailLink
    )
    if (error) {
      return { error: 'Failed to send confirmation email.' }
    }
    return { data: token }
  } catch (error) {
    //TODO: handle specific errors
    console.error(error)
    return { error: 'Failed to send confirmation email.' }
  }
}
