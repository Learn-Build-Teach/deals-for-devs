import CategoryOptions from '@/components/CategoryOptions'
import { redirect } from 'next/navigation'
import { Category } from '@/types/Types'
import { getApprovedDealsByCategory } from '@/lib/queries'
import PageHeader from '@/components/PageHeader'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category: categoryString } = params
  console.log(categoryString)
  //check for valid category
  if (
    !categoryString ||
    Object.keys(Category).indexOf(categoryString.toUpperCase()) === -1
  ) {
    redirect('/')
  }
  const category = categoryString as Category

  const deals = await getApprovedDealsByCategory(category)
  console.log(deals)
  return (
    <div>
      <div className="pb-10">
        <PageHeader
          title={category}
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
      {/* <DealsList deals={deals} /> */}
    </div>
  )
}
