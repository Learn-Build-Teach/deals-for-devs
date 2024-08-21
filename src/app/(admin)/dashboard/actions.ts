'use server'
import { updateDealSchema } from '@/app/(public-pages)/deals/add/schemas'
import { approveDeal, deleteDeal, updateDeal } from '@/lib/queries'
import { DealWithTags } from '@/types/Types'
import { isAdminUser } from '@/utils/auth'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type ReturnValue<T> = {
  data?: T
  successMessage?: string
  error?: string
}

export const updateDealAction = async (
  deal: DealWithTags,
  tags: { text: string }[]
): Promise<ReturnValue<undefined>> => {
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
  if (!isAdmin) {
    return redirect('/')
  }

  const dealNoTags = { ...deal, tags: undefined }

  const validated = updateDealSchema.safeParse(dealNoTags)

  if (validated.success) {
    try {
      await updateDeal(deal, tags)
      return { error: undefined, successMessage: 'Updated successfully' }
    } catch (error) {
      console.error(error)
      return {
        error: 'There was an error updating the deal',
      }
    }
  } else {
    return {
      error: 'Please verify all inputs and try again.',
    }
  }
}

export const approveDealAction = async (
  id: string
): Promise<ReturnValue<undefined>> => {
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
  if (!isAdmin) {
    return redirect('/')
  }
  try {
    await approveDeal(id)
    revalidatePath('/deals')
    return { successMessage: 'Approved successfully' }
  } catch (error) {
    console.error(error)
    return { error: 'There was an error approving the deal' }
  }
}

export const deleteDealAction = async (
  id: string
): Promise<ReturnValue<undefined>> => {
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
  if (!isAdmin) {
    return redirect('/')
  }
  try {
    await deleteDeal(id)
    revalidatePath('/admin/dashboard')
    return { successMessage: 'Rejected successfully' }
  } catch (error) {
    console.error(error)
    return { error: 'There was an error rejecting the deal' }
  }
}
