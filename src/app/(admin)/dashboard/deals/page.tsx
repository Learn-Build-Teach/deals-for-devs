import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import AllAdminDeals from '../AllDeals'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function Deals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={0} />
      <AllAdminDeals />
    </DashboardPage>
  )
}
