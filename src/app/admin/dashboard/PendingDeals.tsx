import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAllPendingDeals } from '@/lib/queries'

export default async function PendingDeals() {
  const deals = await getAllPendingDeals()

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No pending deals</p>}
    </>
  )
}
