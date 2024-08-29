import CategoryOptions from '@/components/CategoryOptions'
import { redirect } from 'next/navigation'
import { Category } from '@/types/Types'
import { getApprovedDealsByCategory } from '@/lib/queries'
import PageHeader from '@/components/PageHeader'
import DealsList from '@/components/deals/DealsList'
import ApprovedDealsByCategory from '@/components/deals/ApprovedDealsByCategory'
import { Suspense } from 'react'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'
import Container from '@/components/Container'

export const revalidate = 120

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
  let capitalizedCategory = category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(' ')
  if (capitalizedCategory.endsWith('s')) {
    capitalizedCategory = capitalizedCategory.slice(0, -1)
  }
  return (
    <Container>
      <main>
        <PageHeader heading={`${capitalizedCategory} Deals`} />
        <div className="pb-10">
          <CategoryOptions />
        </div>
        <Suspense fallback={<LoadingDealsList count={3} />}>
          <ApprovedDealsByCategory category={category} />
        </Suspense>
      </main>
    </Container>
  )
}
