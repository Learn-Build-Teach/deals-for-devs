import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getPendingAdminDeals } from '@/lib/queries'

export default async function PendingAdminDeals() {
  const pendingDeals = await getPendingAdminDeals()

  return (
    <>
      {pendingDeals.length > 0 ?
        <AdminDealsList deals={pendingDeals} />
      : <p>No pending deals</p>}
    </>
  )
}
