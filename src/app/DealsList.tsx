import Deal from '@/components/Deal';
import { DealsRecord } from '@/xata';

export default async function DealsList({
  deals,
  isAdmin = false,
}: {
  deals: DealsRecord[];
  isAdmin?: boolean;
}) {
  return (
    <div>
      {deals.length > 0 && (
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3  gap-4 ">
          {deals.map((deal) => (
            <Deal key={deal.id} deal={deal} showAdminOptions={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
