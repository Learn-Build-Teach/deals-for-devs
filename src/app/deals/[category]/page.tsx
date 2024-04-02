import CategoryOptions from '@/components/CategoryOptions'
import DealsList from '../../../components/deals/DealsList'
import { redirect } from 'next/navigation'
import { getApprovedDealsByCategory } from '@/lib/queries'
import { Category } from '@/types/Types'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category: categoryString } = params
  //check for valid category
  if (!(categoryString in Category)) {
    redirect('/')
  }
  //   const category = categoryString as Category;

  //   const deals = await getApprovedDealsByCategory(category);
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
