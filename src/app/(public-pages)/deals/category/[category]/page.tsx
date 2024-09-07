import { redirect } from 'next/navigation'
import { Category } from '@/types/Types'
import ApprovedDealsByCategory from '@/components/deals/ApprovedDealsByCategory'
import { Suspense } from 'react'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  if (!params.category) {
    redirect('/')
  }

  const categoryString = decodeURIComponent(params.category).toUpperCase()

  if (!(categoryString in Category)) {
    redirect('/')
  }
  const category = categoryString as Category

  return (
    <Suspense fallback={<LoadingDealsList count={3} />}>
      <ApprovedDealsByCategory category={category} />
    </Suspense>
  )
}
