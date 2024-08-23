'use server'

import { newSubscriberSchema } from '@/app/(public-pages)/deals/add/schemas'
import { createSubscriber, deleteSubscriber } from '@/lib/queries'
import { ReturnValue, Status } from '@/types/Types'
import { isAdminUser } from '@/utils/auth'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const MODEL_STR = 'subscriber'

export const deleteSubscriberAction = async (
  id: string
): Promise<ReturnValue<undefined>> => {
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
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
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
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
