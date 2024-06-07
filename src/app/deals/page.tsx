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
      <div>
        <PageHeader title="All deals" />
      </div>
      <Separator className="my-16" />

      <CategoryOptions />
      <div className="py-10">
        <DealsList deals={deals} />
      </div>
      <NeverMissADeal />
    </div>
  )
}
