'use server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { sendConfirmationEmail } from '../utils/resend/email-sendConfirmation'
import { createConfirmEmailLink, createValidateEmailLink } from '@/lib/utils'
import {
  createSubscriber,
  getOneSubscriberByEmail,
} from '@/queries/subscribers'
import { redirect } from 'next/navigation'
import { ActionResult, Status } from '@/types'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export const subscribeAction = async (
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  try {
    const token = uuidv4()

    const parsed = subscribeSchema.safeParse({ email: formData.get('email') })
    if (!parsed.success)
      return { success: false, message: 'Please enter a valid email.' }
    const checkedEmail = parsed.data.email.toLowerCase()

    const existingSubscriber = await getOneSubscriberByEmail(checkedEmail)
    if (existingSubscriber) {
      console.info(`Subscriber exists: ${checkedEmail}`)
      return {
        success: false,
        message: 'This email already exists',
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
      return { success: false, message: 'Failed to send confirmation email.' }
    }

    const confirmEmailLink = createConfirmEmailLink(token)
    redirect(confirmEmailLink)
  } catch (error) {
    //TODO: handle specific errors
    console.error('SUBSCRIBER_SUBSCRIBER', error)
    return { success: false, message: 'Failed to send confirmation email.' }
  }
}
