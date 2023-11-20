import { DealsRecord, getXataClient } from '@/xata';
import Deals from '../DealsList';
import DealsFilter from '@/components/DealsFilter';

export default async function DealsPage() {
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true })
    .sort('xata.createdAt', 'desc')
    .getAll();
  return (
    <div>
      <DealsFilter deals={deals} />
    </div>
  );
}
