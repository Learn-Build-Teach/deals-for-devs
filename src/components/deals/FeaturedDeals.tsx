import DealsList from '@/components/deals/DealsList'
import { getApprovedFeaturedDeals } from '@/lib/queries'
import { Category } from '@/types/Types'
import { getXataClient } from '@/xata'
import React from 'react'

export default async function FeaturedDeals({
  category,
}: {
  category: Category
}) {
  const deals = await getApprovedFeaturedDeals(3)

  if (!deals || deals.length === 0) return null
  return (
    <div>
      <h2 className="mb-6 text-4xl font-bold text-gray-100 ">
        Featured <span className="text-teal-500">{category}</span> Deals
      </h2>
      <DealsList deals={deals} />
    </div>
  )
}
