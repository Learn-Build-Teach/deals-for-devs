import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAllAdminDeals } from '@/lib/queries'

export default async function AllAdminDeals() {
  const deals = await getAllAdminDeals()

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
