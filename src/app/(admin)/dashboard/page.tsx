import DashboardCard from '@/components/dashboard/DashboardCard'
import PendingAdminDeals from './PendingDeals'
import DealListByViews from '@/components/dashboard/metrics/DealListByViews'
import ReportedDeals from '@/components/dashboard/reports/ReportedDeals'
import FeaturedAdminDeals from './FeaturedDeals'
import SubscriberList from '@/components/subscriber/SubscriberList'

export default async function RootDashboardPage() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">Dashboard</h1>
      <div className="grid grid-cols-2 gap-8">
        <DashboardCard
          heading="Pending Deals"
          href="/dashboard/deals/pending"
          linkText="View All Pending Deals"
        >
          <div className="mb-6">
            <PendingAdminDeals limit={5} />
          </div>
        </DashboardCard>
        <DashboardCard
          heading="Featured Deals"
          href="/dashboard/deals/featured"
          linkText="View All Featured Deals"
        >
          <div className="mb-6">
            <FeaturedAdminDeals limit={5} />
          </div>
        </DashboardCard>
        <DashboardCard
          heading="Top Deals"
          href="/dashboard/metrics"
          linkText="View All Metrics"
        >
          <div className="mb-6">
            <DealListByViews limit={5} />
          </div>
        </DashboardCard>
        <DashboardCard
          heading="Reported Deals"
          href="/dashboard/deals/reported"
          linkText="View All Reported Deals"
        >
          <div className="mb-6">
            <ReportedDeals limit={5} />
          </div>
        </DashboardCard>
        <DashboardCard
          heading="Recent Subscribers"
          href="/dashboard/subscribers"
          linkText="View All Subscribers"
        >
          <div className="mb-6">
            <SubscriberList limit={5} />
          </div>
        </DashboardCard>
      </div>
    </section>
  )
}
