'use server'

import { redirect } from 'next/navigation'
import {
  NewDealType,
  contactDetailsSchema,
  couponDetailsSchema,
  newDealSchema,
  productInfoSchema,
} from './schemas'
import { FormErrors } from './types'
import { AddDealRoutes } from '@/types/Types'
import { createDeal } from '@/lib/queries'

export const submitProductInfoAction = (
  prevState: any,
  formData: FormData
): FormErrors | undefined => {
  const productInfo = {
    name: formData.get('name'),
    category: formData.get('category'),
    link: formData.get('link'),
    description: formData.get('description'),
    coverImageURL: formData.get('coverImageURL'),
    coverImageId: formData.get('coverImageId'),
    tags: Array.from(formData.getAll('tag')),
  }

  const validated = productInfoSchema.safeParse(productInfo)
  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string
      acc[path] = issue.message
      return acc
    }, {})
    console.log(errors)
    return errors
  }

  redirect(AddDealRoutes.COUPON_DETAILS)
}

export const submitContactDetailsAction = (
  prevState: any,
  formData: FormData
): FormErrors | undefined => {
  const data = Object.fromEntries(formData.entries())
  const validated = contactDetailsSchema.safeParse(data)
  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string
      acc[path] = issue.message
      return acc
    }, {})
    return errors
  }

  redirect(AddDealRoutes.REVIEW_DEAL)
}

export const submitCouponDetailsAction = (
  prevState: any,
  formData: FormData
): FormErrors | undefined => {
  const data = Object.fromEntries(formData.entries())
  const validated = couponDetailsSchema.safeParse(data)
  console.log(validated.data)

  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string
      acc[path] = issue.message
      return acc
    }, {})
    return errors
  }

  redirect(AddDealRoutes.CONTACT_INFO)
}

export const submitDealAction = async (
  data: NewDealType
): Promise<{ error: string | undefined; redirect?: AddDealRoutes }> => {
  const validated = newDealSchema.safeParse(data)

  if (validated.success) {
    try {
      await createDeal(validated.data)
      return { error: undefined }
    } catch (error) {
      console.error(error)
      return {
        error: 'There was an error submitting the deal',
      }
    }
  } else {
    //TODO: redirect to correect route
    //TODO: display validation on page load
    const redirect = getRedirect(data)
    return {
      error: 'Please verify all inputs and try again.',
      redirect,
    }
  }
}

const getRedirect = (data: NewDealType) => {
  const productInfo = {
    name: data.name,
    category: data.category,
    link: data.link,
    description: data.description,
    coverImageURL: data.coverImageURL,
    coverImageId: data.coverImageId,
  }
  const validatedProductInfo = productInfoSchema.safeParse(productInfo)
  if (!validatedProductInfo.success) {
    return AddDealRoutes.PRODUCT_INFO
  }

  const couponDetails = {
    startDate: data.startDate,
    endDate: data.endDate,
    coupon: data.coupon,
    couponPercent: data.couponPercent,
  }

  const validatedCouponDetails = couponDetailsSchema.safeParse(couponDetails)
  if (!validatedCouponDetails.success) {
    return AddDealRoutes.COUPON_DETAILS
  }

  const contactDetails = {
    contactName: data.contactName,
    contactEmail: data.contactEmail,
  }
  const validatedContactDetails = contactDetailsSchema.safeParse(contactDetails)
  if (!validatedContactDetails.success) {
    return AddDealRoutes.CONTACT_INFO
  }

  return AddDealRoutes.REVIEW_DEAL
}
