'use server'
import { updateDealSchema } from '@/app/deals/add/schemas'
import { approveDeal, deleteDeal, updateDeal } from '@/lib/queries'
import { isAdminUser } from '@/utils/auth'
import { auth } from '@clerk/nextjs'
import { Deal } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateDealAction = async (
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error: string | undefined }> => {
  const { userId } = auth().protect()
  const isAdmin = await isAdminUser(userId)
  if (!isAdmin) {
    return redirect('/')
  }

  const data = {
    xata_id: formData.get('xata_id') as string,
    xata_createdat: formData.get('xata_createdat') as string,
    xata_updatedat: formData.get('xata_updatedat') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    link: formData.get('link') as string,
    coupon: formData.get('coupon') as string,
    couponPercent: parseInt(formData.get('couponPercent') as string),
    contactName: formData.get('contactName') as string,
    contactEmail: formData.get('contactEmail') as string,
    startDate: new Date(formData.get('startDate') as string),
    endDate:
      formData.get('endDate') ?
        new Date(formData.get('endDate') as string)
      : undefined,
  }

  const validated = updateDealSchema.safeParse(data)

  if (validated.success) {
    try {
      //TODO: fix use of unknown
      const deal = validated.data as unknown as Deal
      await updateDeal(deal.xata_id, deal)
      return { error: undefined, success: true }
    } catch (error) {
      console.error(error)
      return {
        error: 'There was an error updating the deal',
        success: false,
      }
    }
  } else {
    console.log(validated.error.issues)
    return {
      error: 'Please verify all inputs and try again.',
      success: false,
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

export type ReturnValue<T> = {
  data?: T
  successMessage?: string
  error?: string
}

export const rejectDealAction = async (
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
