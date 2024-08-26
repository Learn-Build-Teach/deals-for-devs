import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import PendingAdminDeals from '../../PendingDeals'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function PendingDeals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={2} />
      <PendingAdminDeals />
    </DashboardPage>
  )
}
