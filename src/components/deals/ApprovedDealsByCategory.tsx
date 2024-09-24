import React from 'react'
import DealsList from './DealsList'
import { getDeals } from '@/queries/deals'
import { Category } from '@/types'

export default async function ApprovedDealsByCategory({
  category,
}: {
  category: Category
}) {
  const deals = await getDeals({ category })
  return <DealsList deals={deals} />
}
