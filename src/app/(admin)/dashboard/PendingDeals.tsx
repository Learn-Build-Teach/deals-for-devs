import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getPendingAdminDeals } from '@/lib/queries'

interface PendingAdminDealsProps {
  limit?: number
}
export default async function PendingAdminDeals({
  limit,
}: PendingAdminDealsProps) {
  const pendingDeals = await getPendingAdminDeals(limit)

  return (
    <>
      {pendingDeals.length > 0 ?
        <AdminDealsList deals={pendingDeals} />
      : <p>No pending deals</p>}
    </>
  )
}
