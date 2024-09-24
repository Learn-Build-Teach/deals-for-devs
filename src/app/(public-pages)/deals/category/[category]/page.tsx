import { redirect } from 'next/navigation'
import ApprovedDealsByCategory from '@/components/deals/ApprovedDealsByCategory'
import { Suspense } from 'react'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'
import { Category } from '@/types'

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
