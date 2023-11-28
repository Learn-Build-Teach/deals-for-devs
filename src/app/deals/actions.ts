'use server';

import { getXataClient } from '@/xata';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const dealSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional(),
  couponPercentage: z.number().optional(),
  email: z.string().email().optional(),
  //TODO: don't replicate array
  category: z.enum(['misc', 'ebook', 'video', 'tool', 'conference']),
});

export async function createDeal(formData: FormData) {
  let parsed;
  try {
    parsed = dealSchema.parse({
      name: formData.get('name'),
      coupon: formData.get('coupon'),
      link: formData.get('link'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      description: formData.get('description'),
      couponPercent: formData.get('couponPercent'),
      email: formData.get('email') || undefined,
      category: formData.get('category'),
    });
  } catch (error) {
    return console.error(error);
  }
  const newDeal = {
    name: parsed.name,
    coupon: parsed.coupon,
    link: parsed.link,
    startDate: parsed.startDate,
    endDate: parsed.endDate,
    description: parsed.description,
    couponPercentage: parsed.couponPercentage,
    email: parsed.email,
    category: parsed.category,
  };
  const xataClient = getXataClient();
  await xataClient.db.deals.create(newDeal);
  redirect(`/thank-you`);
}
