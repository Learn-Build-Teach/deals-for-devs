'use server'
import { approveDeal, deleteDeal } from '@/lib/queries'
import { revalidatePath } from 'next/cache'

export const approveDealAction = async (id: string) => {
  await approveDeal(id)
  revalidatePath('/deals')
}

export const deleteDealAction = async (id: string) => {
  await deleteDeal(id)
  revalidatePath('/deals')
}
