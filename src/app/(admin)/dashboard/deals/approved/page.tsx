import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import ApprovedAdminDeals from '../../ApprovedDeals'

export default async function ApprovedDeals() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">Approved Deals</h1>
      <ManageDealsNav tabIndex={1} />
      <ApprovedAdminDeals />
    </section>
  )
}
