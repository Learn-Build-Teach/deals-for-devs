import DealsList from '@/app/DealsList';
import { Category } from '@/app/deals/add/DealForm';
import { DealsRecord } from '@/xata';
import Link from 'next/link';
import { type } from 'os';

export default function DealsFilter({ deals }: { deals: DealsRecord[] }) {
  return (
    <div>
      <div className="flex gap-4 mb-10 items-center flex-wrap">
        <span className="text-xl text-gray-100">Categories:</span>
        <Link
          href={`/deals`}
          className="rounded-xl bg-teal-600 text-teal-100 px-4 py-2"
        >
          all
        </Link>
        {Object.values(Category).map((category) => (
          <Link
            href={`/deals/${category}`}
            key={category}
            className="rounded-xl bg-teal-600 text-teal-100 px-4 py-2"
          >
            {category}
          </Link>
        ))}
      </div>
      <DealsList deals={deals} />;
    </div>
  );
}
