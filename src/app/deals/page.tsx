import { DealsRecord, getXataClient } from '@/xata';
import CategoryOptions from '@/components/CategoryOptions';
import DealsList from '../../components/deals/DealsList';

export default async function DealsPage() {
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true })
    .sort('xata.createdAt', 'desc')
    .getAll();
  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-10 text-white">
        Top Deals
      </h1>
      <CategoryOptions />
      <DealsList deals={deals} />
    </div>
  );
}
