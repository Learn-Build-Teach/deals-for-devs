import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getApprovedAdminDeals } from '@/lib/queries'

export default async function ApprovedAdminDeals() {
  const deals = await getApprovedAdminDeals()

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
