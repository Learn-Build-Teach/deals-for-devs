'use server'

import { DealsRecord, getXataClient } from '@/xata'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prisma from '@/lib/db'
import { Deal } from '@prisma/client'
import { ReturnValue } from '@/types/Types'

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

export async function createDeal(
  formData: FormData
): Promise<ReturnValue<Deal>> {
  let parsed
  try {
    parsed = dealSchema.safeParse({
      name: formData.get('name'),
      coupon: formData.get('coupon') || undefined,
      link: formData.get('link'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      description: formData.get('description'),
      couponPercent: formData.get('couponPercent') || undefined,
      email: formData.get('email'),
      category: formData.get('category'),
    })
  } catch (error) {
    console.error(error)
    return { error: 'Invalid form data' }
  }
  if (!parsed.success) return { error: parsed.error.message }
  const newDeal = parsed.data

  const createdRecord = await prisma.deal.create({
    data: newDeal,
  })

  redirect(`/thank-you`)
}
