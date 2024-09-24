'use server'
import { reportDeal } from '@/queries/reports'
import { reportSchema } from '@/schemas/reports'
import { ActionResult } from '@/types'

export const reportDealAction = async (
  dealId: string,
  reason: string,
  email: string
): Promise<ActionResult> => {
  const res = reportSchema.safeParse({ dealId, reason, email })
  if (!res.success) {
    return { message: 'Invalid data', success: false }
  }

  try {
    await reportDeal(dealId, reason, email)
    return { message: 'Reported deal successfully', success: true }
  } catch (error) {
    console.error(error)
    return { message: 'Failed to report deal', success: false }
  }
}
