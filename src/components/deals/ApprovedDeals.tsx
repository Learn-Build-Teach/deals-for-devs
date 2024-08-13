import { getApprovedAdminDeals, getApprovedDeals } from '@/lib/queries'
import React from 'react'
import DealsList from './DealsList'

export default async function ApprovedAdminDeals() {
  const deals = await getApprovedAdminDeals()
  return <DealsList deals={deals} />
}
