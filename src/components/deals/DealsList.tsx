'use client'
import DealCard from '@/components/deals/DealCard'
import { Deal } from '@prisma/client'
import AdminDealCard from './AdminDealCard'

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
        <div className="mx-auto grid grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2  lg:gap-x-12 xl:grid-cols-3">
          {isAdmin && (
            <>
              {deals.map((deal) => (
                <AdminDealCard key={deal.xata_id} deal={deal} />
              ))}
            </>
          )}
          {!isAdmin && (
            <>
              {deals.map((deal) => (
                <DealCard key={deal.xata_id} deal={deal} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
