import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import FeaturedAdminDeals from '../../FeaturedDeals'

export default async function FeaturedDeals() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">Featured Deals</h1>
      <ManageDealsNav tabIndex={3} />
      <FeaturedAdminDeals />
    </section>
  )
}
