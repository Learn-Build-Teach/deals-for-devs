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
    <div className="mx-auto">
      {deals.length > 0 && (
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
          {deals.map((deal) => (
            <Deal key={deal.id} deal={deal} showAdminOptions={isAdmin} />
          ))}
        </div>
      )}
    </div>
  )
}
