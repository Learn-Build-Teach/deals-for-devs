import { getXataClient } from '@/xata';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export enum DealType {
  General = 'general',
  Ebook = 'ebook',
  VideoCourse = 'video-course',
  Tool = 'tool',
  Conference = 'conference',
}

const schema = z.object({
  name: z.string(),
  link: z.string().url(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  coupon: z.string().optional(),
  couponPercentage: z.number().optional(),
  email: z.string().email(),
  //TODO: don't replicate array
  type: z.enum(['general', 'ebook', 'video-course', 'tool', 'conference']),
});

export default function DealForm() {
  async function createDeal(formData: FormData) {
    'use server';
    let parsed;
    try {
      parsed = schema.parse({
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
    console.log(newDeal);
    const xataClient = getXataClient();
    await xataClient.db.deals.create(newDeal);
    redirect(`/thank-you`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className=" mb-4 flex flex-col gap-y-6" action={createDeal}>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
            aria-label="Name"
          >
            {"What's the name of the deal?"}
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="name"
            id="name"
            type="text"
            placeholder="Popular Web Development Course"
            required
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="type"
            aria-label="type"
          >
            {'What type of deal is this?'}
          </label>
          <select
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="type"
            id="type"
            required
          >
            {Object.values(DealType).map((dealType) => (
              <option key={dealType} value={dealType}>
                {dealType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="link"
            aria-label="Link"
          >
            {"What's the link?"}
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="link"
            id="link"
            type="text"
            placeholder="https://cooldeal.com/"
            required
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="description"
            aria-label="description"
          >
            What are the details?
          </label>
          <textarea
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="description"
            id="description"
            rows={3}
            required
          />
        </div>
        <div className="flex gap-x-4">
          <div className="grow">
            <label
              className=" text-gray-300 text-sm font-bold mb-2"
              htmlFor="startDate"
              aria-label="startDate"
            >
              Start date
            </label>
            <input
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              name="startDate"
              id="startDate"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              type="date"
            />
          </div>
          <div className="grow">
            <label
              className=" text-gray-300 text-sm font-bold mb-2"
              htmlFor="endDate"
              aria-label="endDate"
            >
              End date
            </label>
            <input
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              name="endDate"
              id="endDate"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              type="date"
            />
          </div>
        </div>

        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="coupon"
            aria-label="Coupon"
          >
            Coupon code (optional)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="coupon"
            id="coupon"
            type="text"
            placeholder="COOLBFDEAL2023"
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="couponPercent"
            aria-label="couponPercent"
          >
            What percentage off does the coupon give? (optional)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="couponPercent"
            id="couponPercent"
            type="number"
            placeholder="50"
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
            aria-label="email"
          >
            Your email? (in case there are any follow up details needed)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            name="email"
            id="email"
            type="text"
            required
          />
        </div>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32">
          Submit
        </button>
      </form>
    </div>
  );
}
