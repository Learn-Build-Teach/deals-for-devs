import { DealsRecord, getXataClient } from '@/xata';
import Deals from '../../DealsList';
import DealsFilter from '@/components/DealsFilter';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const xataClient = getXataClient();
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true, category })
    .sort('xata.createdAt', 'desc')
    .getAll();
  return (
    <div>
      <DealsFilter deals={deals} />
    </div>
  );
}
