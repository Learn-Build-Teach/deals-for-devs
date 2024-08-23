'use server'
import { newAdminUserSchema } from '@/app/(public-pages)/deals/add/schemas'
import { createAdminUser, deleteAdminUser } from '@/queries/adminUsers'
import { ReturnValue } from '@/types/Types'
import { isAdminUser, isSuperAdminUser } from '@/utils/auth'
import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const MODEL_STR = 'admin user'
export const deleteAdminUserAction = async (
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
    await deleteAdminUser(id)
    revalidatePath('/dashboard/admins')
    return { message: `Successfully deleted ${MODEL_STR}`, success: true }
  } catch (error) {
    console.error(error)
    return { message: `Error deleting ${MODEL_STR}`, success: false }
  }
}

export const createAdminUserAction = async (
  formData: FormData
): Promise<ReturnValue<undefined>> => {
  auth().protect()
  const user = await currentUser()
  const email = user?.emailAddresses[0].emailAddress
  if (!email) {
    return redirect('/')
  }
  const isSuperAdmin = await isSuperAdminUser(email)
  if (!isSuperAdmin) {
    return redirect('/')
  }
  try {
    const email = formData.get('email')

    const res = newAdminUserSchema.safeParse({ email })
    if (!res.success) {
      return { message: 'Invalid input', success: false }
    }
    await createAdminUser(res.data.email)
    revalidatePath('/dashboard/admins')
    return { message: `Successfully created ${MODEL_STR}`, success: true }
  } catch (error) {
    console.error(error)
    return { message: `Error creating ${MODEL_STR}`, success: false }
  }
}
