import DashboardPage from '@/components/dashboard/DashboardPage'
import ManageDealsNav from '@/components/dashboard/ManageDealsNav'
import ReportedDeals from '@/components/dashboard/reports/ReportedDeals'

export default async function Deals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={4} />
      <ReportedDeals />
    </DashboardPage>
  )
}
