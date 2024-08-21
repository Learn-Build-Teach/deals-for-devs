import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import AllAdminDeals from './AllDeals'

export default async function Deals() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">All Deals</h1>
      <ManageDealsNav tabIndex={0} />
      <AllAdminDeals />
    </section>
  )
}
