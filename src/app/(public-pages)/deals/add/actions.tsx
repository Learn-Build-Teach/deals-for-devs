'use server'

import { createDeal } from '@/queries/deals'
import { newDealSchema } from './schemas'
import { FormActionResult, FormErrors } from '@/types'

export const submitDealAction = async (
  prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> => {
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
      await createDeal(validated.data)
      return { success: true }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        message: 'There was an error submitting the deal',
      }
    }
  } else {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string
      acc[path] = issue.message
      return acc
    }, {})
    return {
      success: false,
      errors,
    }
  }
}
