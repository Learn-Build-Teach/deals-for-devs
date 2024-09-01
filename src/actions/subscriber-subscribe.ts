'use server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { createValidateEmailLink } from '@/lib/utils'
import { Status } from '@/types/Types'
import {
  createSubscriber,
  getOneSubscriberByEmail,
} from '@/queries/subscribers'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribe = async (formData: FormData) => {
  try {
    const token = uuidv4()

    const parsed = subscribeSchema.safeParse({ email: formData.get('email') })
    if (!parsed.success) return { error: parsed.error.message }
    const checkedEmail = parsed.data.email.toLowerCase()

    const existingSubscriber = await getOneSubscriberByEmail(checkedEmail)
    if (existingSubscriber) {
      console.info(`Subscriber exists: ${checkedEmail}`)
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
      status: Status.UNSUBSCRIBED,
    }

    await createSubscriber(newSubscriber)

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
