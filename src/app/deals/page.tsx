import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../components/deals/DealsList'
import { redirect } from 'next/navigation'

export default async function DealsPage() {
  redirect('/')
  return (
    <div>
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        Top Deals
      </h1>
      <CategoryOptions />
      {/* <DealsList deals={dealsList} /> */}
    </div>
  )
}
