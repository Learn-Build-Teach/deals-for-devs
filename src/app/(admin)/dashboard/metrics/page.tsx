import DashboardPage from '@/components/dashboard/DashboardPage'
import DealListByViews from '@/components/dashboard/metrics/DealListByViews'

export default async function MetricsPage() {
  return (
    <DashboardPage heading="Metrics">
      <div className="mb-10"></div>
      <div className="mb-10">
        <h3 className="mb-10 pt-8 text-center text-lg uppercase">Top Deals</h3>
        <DealListByViews />
      </div>
    </DashboardPage>
  )
}
