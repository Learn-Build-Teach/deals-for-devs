'use server';

import { getXataClient } from '@/xata';
import { dealSchema } from './add/page';
import { redirect } from 'next/navigation';

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
