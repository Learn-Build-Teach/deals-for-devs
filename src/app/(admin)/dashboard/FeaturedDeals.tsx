import AdminDealsList from '@/components/dashboard/AdminDealsList'
import { getAdminDeals } from '@/queries/adminDeals'

interface FeaturedAdminDealsProps {
  limit?: number
}
export default async function FeaturedAdminDeals({
  limit,
}: FeaturedAdminDealsProps) {
  const deals = await getAdminDeals({ featured: true, limit })

  return (
    <>
      {deals.length > 0 ?
        <AdminDealsList deals={deals} />
      : <p>No deals</p>}
    </>
  )
}
