import DashboardPage from '@/components/dashboard/DashboardPage'
import ManageDealsNav from '@/components/dashboard/ManageDealsNav'

export default async function Deals() {
  return (
    <DashboardPage heading="Manage Deals">
      <ManageDealsNav tabIndex={4} />
      <p>Coming soon!</p>
    </DashboardPage>
  )
}
