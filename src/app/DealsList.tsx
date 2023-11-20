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
        <div className="grid grid-cols-1 sm:justify-items-stretch justify-items-center w-full sm:grid-cols-2 md:grid-cols-3  gap-4 ">
          {deals.map((deal) => (
            <Deal key={deal.id} deal={deal} showAdminOptions={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
