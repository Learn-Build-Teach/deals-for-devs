import React from 'react'
import DealsList from './DealsList'
import { Category } from '@/types/Types'
import { getDeals } from '@/queries/deals'

export default async function ApprovedDealsByCategory({
  category,
}: {
  category: Category
}) {
  const deals = await getDeals({ category })
  return <DealsList deals={deals} />
}
