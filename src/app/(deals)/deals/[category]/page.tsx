import CategoryOptions from '@/components/CategoryOptions'
import { redirect } from 'next/navigation'
import { Category } from '@/types/Types'
import { getApprovedDealsByCategory } from '@/lib/queries'
import PageHeader from '@/components/PageHeader'
import DealsList from '@/components/deals/DealsList'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  if (!params.category) {
    redirect('/')
  }

  const categoryString = decodeURIComponent(params.category).toUpperCase()

  if (Object.keys(Category).indexOf(categoryString as Category) === -1) {
    redirect('/')
  }
  const category = categoryString as Category
  console.log(category)
  const deals = await getApprovedDealsByCategory(category)
  console.log(deals)
  return (
    <div>
      <div className="pb-10">
        <PageHeader
          title={category.toLocaleLowerCase()}
          subtitle={`The best ${category.toLowerCase()} deals`}
        />
      </div>
      <div className="pb-10">
        <CategoryOptions />
      </div>
      {deals.length === 0 && (
        <div className="text-center text-lg text-gray-500">
          No deals found for this category
        </div>
      )}
      <DealsList deals={deals} />
    </div>
  )
}
