import { DealsRecord, getXataClient } from '@/xata'
import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../../components/deals/DealsList'
import { redirect } from 'next/navigation'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params
  // const xataClient = getXataClient()
  // const deals: DealsRecord[] = await xataClient.db.deals
  //   .filter({ approved: true, category })
  //   .sort('xata.createdAt', 'desc')
  //   .getAll()
  redirect('/')
  return (
    <div>
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        Top <span className="text-teal-500">{params.category}</span> Deals
      </h1>
      <CategoryOptions />
      {/* <DealsList deals={deals} /> */}
    </div>
  )
}
