'use server'

import { newSubscriberSchema } from '@/app/(public-pages)/deals/add/schemas'
import { deleteSubscriber, createSubscriber } from '@/queries/subscribers'
import { ReturnValue, Status } from '@/types/Types'
import { isAdminUser } from '@/utils/auth'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const MODEL_STR = 'subscriber'

export const deleteSubscriberAction = async (
  id: string
): Promise<ReturnValue<undefined>> => {
  auth().protect()
  const user = await currentUser()

  const email = user?.emailAddresses[0].emailAddress
  if (!email) {
    return redirect('/')
  }
  const isAdmin = await isAdminUser(email)
  if (!isAdmin) {
    return redirect('/')
  }
  try {
    await deleteSubscriber(id)
    revalidatePath('/dashboard/subscribers')
    return { message: `Successfully deleted ${MODEL_STR}`, success: true }
  } catch (error) {
    console.error(error)
    return { message: `Error deleting ${MODEL_STR}`, success: false }
  }
}

export const createSubscriberAction = async (
  formData: FormData
): Promise<ReturnValue<undefined>> => {
  auth().protect()
  const user = await currentUser()

  const email = user?.emailAddresses[0].emailAddress
  if (!email) {
    return redirect('/')
  }
  const isAdmin = await isAdminUser(email)
  if (!isAdmin) {
    return redirect('/')
  }
  try {
    const email = formData.get('email')

    const res = newSubscriberSchema.safeParse({ email })
    if (!res.success) {
      return { message: 'Invalid input', success: false }
    }
    await createSubscriber({
      email: res.data.email,
      token: uuidv4(),
      courseNotifications: true,
      ebookNotifications: true,
      miscNotifications: true,
      officeEquipmentNotifications: true,
      toolNotifications: true,
      conferenceNotifications: true,
      status: Status.SUBSCRIBED,
    })
    revalidatePath('/dashboard/subscribers')
    return { message: `Successfully created ${MODEL_STR}`, success: true }
  } catch (error) {
    console.error(error)
    return { message: `Error creating ${MODEL_STR}`, success: false }
  }
}
