import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAdminDeals } from '@/queries/adminDeals'

export default async function FeaturedAdminDeals() {
  const deals = await getAdminDeals({ featured: true })

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
