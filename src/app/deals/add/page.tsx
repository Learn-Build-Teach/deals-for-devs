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
  email: z.string().email().optional(),
  //TODO: don't replicate array
  category: z.enum(['misc', 'ebook', 'video', 'tool', 'conference']),
});

export default function AddDealPage() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-10 text-gray-100 text-center">
        Share a deal?
      </h1>
      <div className="max-w-2xl mx-auto">
        <DealForm />
      </div>
    </main>
  );
}
