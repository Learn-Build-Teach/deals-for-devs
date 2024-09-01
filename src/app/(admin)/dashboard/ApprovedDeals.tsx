import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAdminDeals } from '@/queries/adminDeals'

export default async function ApprovedAdminDeals() {
  const deals = await getAdminDeals({ approved: true })

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
