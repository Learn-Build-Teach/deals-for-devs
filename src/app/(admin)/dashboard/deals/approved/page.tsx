import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import ApprovedAdminDeals from '../../ApprovedDeals'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function ApprovedDeals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={1} />
      <ApprovedAdminDeals />
    </DashboardPage>
  )
}
