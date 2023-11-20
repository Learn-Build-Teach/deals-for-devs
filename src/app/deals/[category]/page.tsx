import { DealsRecord, getXataClient } from '@/xata';
import CategoryOptions from '@/components/CategoryOptions';
import DealsList from '../../DealsList';

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
      <h1 className="text-4xl text-center font-bold mb-10 text-white">
        Top <span className="text-teal-500">{params.category}</span> Deals
      </h1>
      <DealsList deals={deals} />
    </div>
  );
}
