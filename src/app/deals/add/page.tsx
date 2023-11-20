import DealForm from './DealForm';
import { Metadata } from 'next';
import { getXataClient } from '@/xata';
import { redirect } from 'next/navigation';
import { z } from 'zod';

//TODO: why doesn't this work with server component page?
// export const metadata: Metadata = {
//   title: 'Add a Black Friday Deal',
//   description: 'Share the best deals that you know developers will love!',
// };

export enum Category {
  Ebook = 'ebook',
  Video = 'video',
  Tool = 'tool',
  Conference = 'conference',
  Misc = 'misc',
}

export const dealSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional(),
  couponPercentage: z.number().optional(),
  email: z.string().email(),
  //TODO: don't replicate array
  type: z.enum(['misc', 'ebook', 'video', 'tool', 'conference']),
});

export default function AddDealPage() {
  async function createDeal(formData: FormData) {
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
        email: formData.get('email'),
        type: formData.get('type'),
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
    };
    const xataClient = getXataClient();
    await xataClient.db.deals.create(newDeal);
    redirect(`/thank-you`);
  }
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-10 text-gray-100 text-center">
        Share a deal?
      </h1>
      <DealForm createDeal={createDeal} />
    </main>
  );
}
