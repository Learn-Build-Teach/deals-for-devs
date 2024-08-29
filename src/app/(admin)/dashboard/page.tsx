import DashboardCard from '@/components/dashboard/DashboardCard'
import PendingAdminDeals from './PendingDeals'
import DealListByViews from '@/components/dashboard/metrics/DealListByViews'
import Link from 'next/link'
import ReportedDeals from '@/components/dashboard/reports/ReportedDeals'

export default async function RootDashboardPage() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">Dashboard</h1>
      <div className="grid grid-cols-2 gap-8">
        <DashboardCard heading="Pending Deals">
          <div className="mb-6">
            <PendingAdminDeals limit={5} />
          </div>
          <div className="flex justify-end">
            <Link
              className="text-right underline transition-colors hover:text-teal-500"
              href="/dashboard/deals/pending"
            >
              View All Pending Deals
            </Link>
          </div>
        </DashboardCard>
        <DashboardCard heading="Top Deals">
          <div className="mb-6">
            <DealListByViews limit={5} />
          </div>
          <div className="flex justify-end">
            <Link
              className="text-right underline transition-colors hover:text-teal-500"
              href="/dashboard/metrics"
            >
              View All Metrics
            </Link>
          </div>
        </DashboardCard>
        <DashboardCard heading="Reported Deals">
          <div className="mb-6">
            <ReportedDeals limit={5} />
          </div>
          <div className="flex justify-end">
            <Link
              className="text-right underline transition-colors hover:text-teal-500"
              href="/dashboard/deals/reported"
            >
              View All Reported Deals
            </Link>
          </div>
        </DashboardCard>
      </div>
    </section>
  )
}
