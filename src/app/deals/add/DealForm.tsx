import { createDeal } from '../actions';
import { Category } from './page';
import SubmitButton from '@/components/SubmitButton';
import { FaCaretDown } from 'react-icons/fa';

export default function DealForm() {
  return (
    <div>
      <form className=" mb-1 block flex flex-col gap-y-6" action={createDeal}>
        <div className="flex gap-x-4">
          <div className="grow">
            <label
              className=" text-gray-300 text-sm font-bold mb-1 block"
              htmlFor="name"
              aria-label="Name"
            >
              {"What's the name of the deal?"}
            </label>
            <input
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
              name="name"
              id="name"
              type="text"
              placeholder="Popular Web Development Course"
              required
            />
          </div>
          <div className="relative">
            <label
              className=" text-gray-300 text-sm font-bold mb-1 block"
              htmlFor="category"
              aria-label="category"
            >
              {'Category'}
            </label>
            <select
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent cursor-pointer"
              name="category"
              id="category"
              required
            >
              {Object.values(Category).map((dealType) => (
                <option key={dealType} value={dealType}>
                  {dealType}
                </option>
              ))}
            </select>
            {/* <FaCaretDown className="absolute cursor-pointer bottom-3 right-2 text-gray-300" /> */}
          </div>
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-1 block"
            htmlFor="link"
            aria-label="Link"
          >
            {"What's the link?"}
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
            name="link"
            id="link"
            type="text"
            placeholder="https://cooldeal.com/"
            required
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-1 block"
            htmlFor="description"
            aria-label="description"
          >
            What are the details?
          </label>
          <textarea
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
            name="description"
            id="description"
            rows={3}
            required
          />
        </div>
        <div className="flex gap-x-4">
          <div className="grow">
            <label
              className=" text-gray-300 text-sm font-bold mb-1 block"
              htmlFor="startDate"
              aria-label="startDate"
            >
              Start date
            </label>
            <input
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
              name="startDate"
              id="startDate"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              type="date"
            />
          </div>
          <div className="grow">
            <label
              className=" text-gray-300 text-sm font-bold mb-1 block"
              htmlFor="endDate"
              aria-label="endDate"
            >
              End date
            </label>
            <input
              className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
              name="endDate"
              id="endDate"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              type="date"
            ></input>
          </div>
        </div>

        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-1 block"
            htmlFor="coupon"
            aria-label="Coupon"
          >
            Coupon code (optional)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
            name="coupon"
            id="coupon"
            type="text"
            placeholder="COOLBFDEAL2023"
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-1 block"
            htmlFor="couponPercent"
            aria-label="couponPercent"
          >
            What percentage off does the coupon give? (optional)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
            name="couponPercent"
            id="couponPercent"
            type="number"
            placeholder="50"
          />
        </div>
        <div>
          <label
            className=" text-gray-300 text-sm font-bold mb-1 block"
            htmlFor="email"
            aria-label="email"
          >
            Your email? (in case there are any follow up details needed)
          </label>
          <input
            className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-teal-300 bg-transparent "
            name="email"
            id="email"
            type="text"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
