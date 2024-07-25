'use client'
import DealCard from '@/components/deals/DealCard'
import { Deal } from '@prisma/client'

export default function DealsList({
  deals,
}: {
  deals: Deal[]
  isAdmin?: boolean
}) {
  return (
    <div className="mx-auto py-10">
      {deals.length === 0 && (
        <div className="text-center text-xl text-gray-300">No deals found</div>
      )}
      {deals.length > 0 && (
        <div className="mx-auto grid grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2  lg:gap-x-12 xl:grid-cols-3">
          <>
            {deals.map((deal) => (
              <DealCard key={deal.xata_id} deal={deal} />
            ))}
          </>
        </div>
      )}
    </div>
  )
}
