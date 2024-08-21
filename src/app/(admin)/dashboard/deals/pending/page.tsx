import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import PendingAdminDeals from '../../PendingDeals'

export default async function PendingDeals() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">Pending Deals</h1>
      <ManageDealsNav tabIndex={2} />
      <PendingAdminDeals />
    </section>
  )
}
