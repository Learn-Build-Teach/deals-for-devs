import { getApprovedDeals } from '@/lib/queries'
import React from 'react'
import DealsList from './DealsList'

export default async function ApprovedDeals() {
  const deals = await getApprovedDeals(20)

  return <DealsList deals={deals} />
}
