import Hero from '@/components/Hero';
import Deals from './DealsList';
import { DealsRecord, getXataClient } from '@/xata';
import Countdown from 'react-countdown';
import Timer from '@/components/Timer';

export default async function Home() {
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true })
    .sort('xata.createdAt', 'desc')
    .getMany();
  return (
    <main>
      <Hero />
      <div className="mb-20">
        <Timer />
      </div>
      <Deals deals={deals} />
    </main>
  );
}
