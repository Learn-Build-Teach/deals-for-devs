'use server'

import { createDeal } from '@/queries/deals'
import { newDealSchema } from './schemas'
import { DealFormServerState, FormErrors } from './types'
import { inngest } from '@/utils/inngest/client'

export const submitDealAction = async (
  prevState: DealFormServerState,
  formData: FormData
): Promise<DealFormServerState> => {
  const dealFromForm = {
    name: formData.get('name'),
    category: formData.get('category'),
    link: formData.get('link'),
    description: formData.get('description'),
    coverImageURL: formData.get('coverImageURL'),
    coverImageId: formData.get('coverImageId'),
    tags: Array.from(formData.getAll('tag')).map((tag) => ({
      text: tag.toString().trim().toLocaleLowerCase(),
    })),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || undefined,
    coupon: formData.get('coupon'),
    couponPercent: formData.get('couponPercent'),
    contactName: formData.get('contactName'),
    contactEmail: formData.get('contactEmail'),
  }

  const validated = newDealSchema.safeParse(dealFromForm)

  if (validated.success) {
    try {
      const deal = await createDeal(validated.data)
      try {
        const { ids } = await inngest.send({
          name: 'admin/new-deal-created',
          data: {
            dealId: deal.xata_id,
          },
        })
      } catch (error) {
        console.error('Error sending emails:', error)
      }

      return { success: true }
    } catch (error) {
      console.error('Error in deal creation process:', error)
      return {
        success: false,
        message: 'There was an error creating the deal',
      }
    }
  }
  // Handle validation failure
  const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
    const path = issue.path[0] as string
    acc[path] = issue.message
    return acc
  }, {})
  return { success: false, errors }
}
