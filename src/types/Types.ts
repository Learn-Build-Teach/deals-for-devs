import { z } from 'zod'
import { Prisma } from '@prisma/client'

export enum Category {
  EBOOKS = 'Ebooks',
  COURSES = 'Courses',
  TOOLS = 'Tools',
  CONFERENCES = 'Conferences',
  MISC = 'Misc',
  BOOTCAMPS = 'Bootcamps',
  'OFFICE EQUIPMENT' = 'Office Equipment',
}

export enum AddDealRoutes {
  PRODUCT_INFO = 'product-info',
  COUPON_DETAILS = 'coupon-details',
  CONTACT_INFO = 'contact-info',
  REVIEW_DEAL = 'review-deal',
}

export enum Status {
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
}

export const FORM_DEAL_SCHEMA = z.object({
  name: z.string().max(40),
  link: z.string().url(),
  description: z.string().max(240),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional().optional(),
  couponPercent: z.number().optional(),
  email: z.string().email(),
  category: z.nativeEnum(Category),
})

export type NewSubscriberData = {
  email: string
  token: string
  courseNotifications: boolean
  ebookNotifications: boolean
  miscNotifications: boolean
  officeEquipmentNotifications: boolean
  toolNotifications: boolean
  conferenceNotifications: boolean
  status: string
}

export type ReturnValue<T> = {
  data?: T
  message?: string
  success: boolean
  error?: Error
}

export enum ImageUploadStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

export type DealWithTags = Prisma.DealGetPayload<{
  include: { tags: true }
}>
