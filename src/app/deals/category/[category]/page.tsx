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
  //TODO move logic for converting deals to capitalized and singular to a helper function
  const category = categoryString as Category
  const deals = await getApprovedDealsByCategory(category)
  let capitalizedCategory = category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(' ')
  if (capitalizedCategory.endsWith('s')) {
    capitalizedCategory = capitalizedCategory.slice(0, -1)
  }
  return (
    <div>
      <div className="pb-10">
        <PageHeader title={`${capitalizedCategory} Deals`} />
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
    </div>
  )
}
