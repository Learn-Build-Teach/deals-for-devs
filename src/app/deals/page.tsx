import CategoryOptions from '@/components/CategoryOptions'
import { getApprovedDeals } from '@/lib/queries'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'
import PageHeader from '@/components/PageHeader'
import DealsList from '@/components/deals/DealsList'

export default async function DealsPage() {
  const deals = await getApprovedDeals(20)
  //TODO: handle error
  return (
    <div>
      <div className="pb-10">
        <PageHeader title="All Deals" />
      </div>
      <div className="pb-10">
        <CategoryOptions />
      </div>
      {deals.length === 0 && (
        <div className="text-center text-xl text-gray-300">
          No deals found for this category
        </div>
      )}
      <DealsList deals={deals} />
      <NeverMissADeal />
    </div>
  )
}
