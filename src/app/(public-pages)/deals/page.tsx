import CategoryOptions from '@/components/CategoryOptions'
import Container from '@/components/Container'
import NeverMissADeal from '@/components/NeverMissADeal'
import PageHeader from '@/components/PageHeader'
import ApprovedDeals from '@/components/deals/ApprovedDeals'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'
import { Suspense } from 'react'

export const revalidate = 120

export default async function DealsPage() {
  return (
    <Container className="pb-20">
      <PageHeader heading="Deals" />
      <div className="pb-10">
        <CategoryOptions selectedCategory={undefined} />
      </div>

      <Suspense fallback={<LoadingDealsList count={3} />}>
        <ApprovedDeals />
      </Suspense>
      <NeverMissADeal />
    </Container>
  )
}
