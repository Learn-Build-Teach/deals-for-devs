'use client'
import DealCard from '@/components/deals/Deal'
import { DealsRecord } from '@/xata'
import { Deal } from '@prisma/client'

export default function DealsList({
  deals,
  isAdmin = false,
}: {
  deals: Deal[]
  isAdmin?: boolean
}) {
  return (
    <div className="mx-auto">
      {deals.length > 0 && (
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
          {deals.map((deal) => (
            <DealCard
              key={deal.xata_id}
              deal={deal}
              showAdminOptions={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  )
}
