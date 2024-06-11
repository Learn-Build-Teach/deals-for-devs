'use client'
import DealCard from '@/components/deals/DealCard'
import { Deal } from '@prisma/client'

export default function DealsList({
  deals,
  isAdmin = false,
}: {
  deals: Deal[]
  isAdmin?: boolean
}) {
  return (
    <div className="mx-auto py-10">
      {deals.length > 0 && (
        <div className="mx-auto grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:gap-12 xl:grid-cols-3">
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
