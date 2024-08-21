import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getFeaturedAdminDeals } from '@/lib/queries'

export default async function FeaturedAdminDeals() {
  const deals = await getFeaturedAdminDeals()

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
