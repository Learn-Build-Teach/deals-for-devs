import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAllPendingDeals } from '@/lib/queries'

export default async function PendingDeals() {
  const deals = await getAllPendingDeals()

  return <AdminDealsList deals={deals} />
}
