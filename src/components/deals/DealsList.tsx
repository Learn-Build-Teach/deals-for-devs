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
    <div>
      {deals.length > 0 && (
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch  md:grid-cols-3 ">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} showAdminOptions={isAdmin} />
          ))}
        </div>
      )}
    </div>
  )
}
