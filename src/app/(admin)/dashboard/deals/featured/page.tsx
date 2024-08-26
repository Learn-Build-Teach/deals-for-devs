import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import FeaturedAdminDeals from '../../FeaturedDeals'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function FeaturedDeals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={3} />
      <FeaturedAdminDeals />
    </DashboardPage>
  )
}
