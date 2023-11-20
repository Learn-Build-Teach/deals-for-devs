import Hero from '@/components/Hero';
import Deals from './DealsList';
import { DealsRecord, getXataClient } from '@/xata';
import Timer from '@/components/Timer';
import Link from 'next/link';

export default async function Home() {
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true, featured: true })
    .sort('xata.createdAt', 'desc')
    .getMany();
  return (
    <main>
      <Hero />
      <div className="mb-20">
        <Timer />
      </div>
      <h2 className="text-4xl font-bold mb-8 text-gray-100 text-center">
        Featured Deals
      </h2>
      <Deals deals={deals} />
      <div className="text-center my-20">
        <Link
          href="/deals"
          className="text-xl border-4 border-teal-800 bg-teal-600 text-teal-100 px-10 p-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 ease-in-out "
        >
          View All Deals
        </Link>
      </div>
    </main>
  );
}
