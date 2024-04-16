import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../../components/deals/DealsList'
import { getApprovedDeals } from '@/lib/queries'

export default async function DealsPage() {
  const deals = await getApprovedDeals(20)
  //TODO: handle error
  return (
    <div>
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        Top Deals
      </h1>
      <CategoryOptions />
      <DealsList deals={deals} />
    </div>
  )
}
