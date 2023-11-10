import Hero from '@/components/Hero';
import Deals from './DealsList';
import { DealsRecord, getXataClient } from '@/xata';

export default async function Home() {
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true })
    .sort('xata.createdAt', 'desc')
    .getMany();
  return (
    <main>
      <Hero />
      <Deals deals={deals} />
    </main>
  );
}
