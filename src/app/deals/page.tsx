import { DealsRecord, getXataClient } from '@/xata'
import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../components/deals/DealsList'

export default async function DealsPage() {
  const xataClient = getXataClient()
  const deals: DealsRecord[] = await xataClient.db.deals
    .filter({ approved: true })
    .sort('xata.createdAt', 'desc')
    .getAll()

  const dealsList = JSON.parse(JSON.stringify(deals))

  return (
    <div>
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        Top Deals
      </h1>
      <CategoryOptions />
      <DealsList deals={dealsList} />
    </div>
  )
}
