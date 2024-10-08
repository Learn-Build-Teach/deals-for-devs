import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAdminDeals } from '@/queries/adminDeals'

interface PendingAdminDealsProps {
  limit?: number
}
export default async function PendingAdminDeals({
  limit,
}: PendingAdminDealsProps) {
  const pendingDeals = await getAdminDeals({ limit, approved: false })

  return (
    <>
      {pendingDeals.length > 0 ?
        <AdminDealsList deals={pendingDeals} />
      : <p>No pending deals</p>}
    </>
  )
}
