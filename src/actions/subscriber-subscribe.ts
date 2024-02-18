'use server'
import { getXataClient } from '@/xata'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { sendConfirmationEmail } from './email-sendConfirmation'
import { redirect } from 'next/navigation'
import { baseURL } from '@/lib/utils'

const subscribeSchema = z.object({
  email: z.string().email(),
  token: z.string(),
})

// generate uuid
const token = uuidv4()

export const subscribe = async (formData: FormData) => {
  let parsed

  // parse the email and token
  parsed = subscribeSchema.parse({ email: formData.get('email'), token: token })

  const newSubscriber = {
    email: parsed.email,
    token: parsed.token,
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

  const link = `${baseURL()}/validate?token=${token}`

  // send email
  sendConfirmationEmail(parsed.email, link)

  // route subscriber to preference page
  revalidatePath('/admin')
  redirect(`${baseURL()}/confirm/${token}`)
}
