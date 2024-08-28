import { getReportedDeals } from '@/queries/reports'
import React from 'react'
import AdminDealsList from '../AdminDealsList'

interface ReportedDealsProps {
  limit?: number
}
export default async function ReportedDeals({ limit }: ReportedDealsProps) {
  const reportedDeals = await getReportedDeals(limit)
  console.log(reportedDeals)
  return (
    <>
      {reportedDeals.length > 0 ?
        <AdminDealsList deals={reportedDeals} />
      : <p>No reported deals</p>}
    </>
  )
}
