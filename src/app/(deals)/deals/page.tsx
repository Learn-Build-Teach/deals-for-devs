import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../../components/deals/DealsList'
import { getApprovedDeals } from '@/lib/queries'
import NeverMissADeal from '@/components/NeverMissADeal'
import Separator from '@/components/Separator'
import PageHeader from '@/components/PageHeader'

export default async function DealsPage() {
  const deals = await getApprovedDeals(20)
  //TODO: handle error
  return (
    <div>
      <div>
        <PageHeader
          title="View all deals"
          subtitle="From online courses to conference tickets, we've curated the best ongoing deals!"
        />
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
