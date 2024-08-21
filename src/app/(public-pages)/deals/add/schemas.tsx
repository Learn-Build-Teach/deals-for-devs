import { z } from 'zod'

export const productInfoSchema = z.object({
  name: z.string().min(1, 'Please enter a product name'),
  category: z.string().min(1, 'Please select a category'),
  link: z
    .string()
    .url('Please enter a valid URL including starting with https://'),
  tags: z.array(z.object({ text: z.string() })).optional(),
  description: z.string().min(1, 'Please enter a product description'),
  coverImageURL: z.string().optional(),
  coverImageId: z.string().optional(),
})

export const couponDetailsSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().optional().or(z.string().datetime()),
  coupon: z.string().optional(),
  couponPercent: z.coerce.number().optional(),
})

export const contactDetailsSchema = z.object({
  contactName: z.string().min(1, 'Please enter a contact name'),
  contactEmail: z.string().email('Please enter a valid email'),
})

export const newDealSchema = z.object({
  ...productInfoSchema.shape,
  ...couponDetailsSchema.shape,
  ...contactDetailsSchema.shape,
})

export const updateDealSchema = z.object({
  xata_id: z.string(),
  xata_createdat: z.date(),
  xata_updatedat: z.date(),
  ...productInfoSchema.shape,
  ...couponDetailsSchema.shape,
  ...contactDetailsSchema.shape,
  endDate: z.date().nullable(),
  startDate: z.date(),
})

export const newDealInitialValuesSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  link: z.string().optional(),
  tags: z.array(z.object({ text: z.string() })).optional(),
  description: z.string().optional(),
  coverImageURL: z.string().optional(),
  coverImageId: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  coupon: z.string().optional(),
  couponPercent: z.coerce.number().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
})

export type ProductInfoType = z.infer<typeof productInfoSchema>
export type CouponDetailsType = z.infer<typeof couponDetailsSchema>
export type ContactDetailsType = z.infer<typeof contactDetailsSchema>
export type NewDealType = z.infer<typeof newDealSchema>
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>
