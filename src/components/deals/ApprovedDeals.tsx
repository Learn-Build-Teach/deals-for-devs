import React from 'react'
import DealsList from './DealsList'
import { getAdminDeals } from '@/queries/adminDeals'
import { getDeals } from '@/queries/deals'

interface ApprovedAdminDealsProps {
  limit?: number
}
export default async function ApprovedAdminDeals({
  limit,
}: ApprovedAdminDealsProps) {
  const deals = await getDeals({ limit })
  return <DealsList deals={deals} />
}
