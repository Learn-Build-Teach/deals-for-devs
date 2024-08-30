import { getApprovedDealsByCategory } from '@/lib/queries'
import React from 'react'
import DealsList from './DealsList'
import { Category } from '@/types/Types'

export default async function ApprovedDealsByCategory({
  category,
}: {
  category: Category
}) {
  const deals = await getApprovedDealsByCategory(category)
  return <DealsList deals={deals} />
}
