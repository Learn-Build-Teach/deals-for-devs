import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAdminDeals } from '@/queries/adminDeals'

export default async function AllAdminDeals() {
  const deals = await getAdminDeals({})

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
