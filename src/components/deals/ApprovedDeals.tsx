import { getApprovedAdminDeals, getApprovedDeals } from '@/lib/queries'
import React from 'react'
import DealsList from './DealsList'

interface ApprovedAdminDealsProps {
  limit?: number
}
export default async function ApprovedAdminDeals({
  limit,
}: ApprovedAdminDealsProps) {
  const deals = await getApprovedAdminDeals(limit)
  return <DealsList deals={deals} />
}
