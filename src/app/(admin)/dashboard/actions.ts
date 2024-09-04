'use server'
import { updateDealSchema } from '@/app/(public-pages)/deals/add/schemas'
import { updateDeal, approveDeal, deleteDeal } from '@/queries/deals'
import { DealWithTags } from '@/types/Types'
import { isAdminUser } from '@/utils/auth'
import { auth, currentUser } from '@clerk/nextjs/server'
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
    await deleteDeal(id)
    revalidatePath('/dashboard')
    return { successMessage: 'Rejected successfully' }
  } catch (error) {
    console.error(error)
    return { error: 'There was an error rejecting the deal' }
  }
}
