'use client'
import Deal from '@/components/deals/Deal'
import { DealsRecord } from '@/xata'

export default function DealsList({
  deals,
  isAdmin = false,
}: {
  deals: DealsRecord[]
  isAdmin?: boolean
}) {
  return (
    <div>
      {deals.length > 0 && (
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch  md:grid-cols-3 ">
          {deals.map((deal) => (
            <Deal key={deal.id} deal={deal} showAdminOptions={isAdmin} />
          ))}
        </div>
      )}
    </div>
  )
}
