import { z } from 'zod'

export enum Category {
  EBOOK = 'Ebook',
  COURSE = 'Course',
  TOOL = 'Tool',
  CONFERENCE = 'Conference',
  MISC = 'Misc',
  BOOTCAMP = 'Bootcamp',
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

export type ReturnValue<T> = { data: T } | { error: string }
