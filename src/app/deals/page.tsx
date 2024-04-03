import CategoryOptions from '@/components/CategoryOptions'
import NeverMissADeal from '@/components/NeverMissADeal'
import DealsList from '../../components/deals/DealsList'
import { getApprovedDeals, getRecentApprovedDealsByDate } from '@/lib/queries'

export default async function DealsPage() {
  const deals = await getApprovedDeals(20)
  //TODO: handle error
  return (
    <div className="mx-7 grid">
      <h1 className="text-4xl font-semibold text-white mb-4">
        View all deals
      </h1>
      <p className="text-sm text-white mb-9">
        From online courses to conferance tickets, we&apos;ve curated the best ongoing deals!
      </p>
      <hr className="mb-16 opacity-30" />
      <CategoryOptions />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DealsList deals={deals.slice(0, 1)} />
      </div>
      <NeverMissADeal />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DealsList deals={deals.slice(1)} />
      </div>
    </div>
  )
}
