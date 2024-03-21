'use server'

import { DealsRecord, getXataClient } from '@/xata'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/db'

const dealSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional(),
  couponPercent: z.number().optional(),
  email: z.string().email(),
  //TODO: don't replicate array
  category: z.enum(['misc', 'ebook', 'video', 'tool', 'conference']),
})

export async function createDeal(formData: FormData) {
  let parsed
  try {
    parsed = dealSchema.safeParse({
      name: formData.get('name'),
      coupon: formData.get('coupon'),
      link: formData.get('link'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      description: formData.get('description'),
      couponPercent: formData.get('couponPercent'),
      email: formData.get('email') || undefined,
      category: formData.get('category'),
    })
  } catch (error) {
    return console.error(error)
  }
  if (!parsed.success) return { error: parsed.error }
  const newDeal = {
    name: parsed.data.name,
    coupon: parsed.data.coupon,
    link: parsed.data.link,
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate,
    description: parsed.data.description,
    couponPercent: parsed.data.couponPercent,
    email: parsed.data.email,
    category: parsed.data.category,
  }

  const createdRecord = await prisma.deal.create({
    data: newDeal,
  })

  console.log(createdRecord)
  redirect(`/thank-you`)
}
