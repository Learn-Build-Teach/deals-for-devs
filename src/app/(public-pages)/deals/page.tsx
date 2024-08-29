import CategoryOptions from '@/components/CategoryOptions'
import Container from '@/components/Container'
import NeverMissADeal from '@/components/NeverMissADeal'
import PageHeader from '@/components/PageHeader'
import ApprovedDeals from '@/components/deals/ApprovedDeals'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'
import { Suspense } from 'react'

export const revalidate = 120

export default async function DealsPage() {
  //TODO: handle error
  return (
    <Container>
      <main>
        <PageHeader heading="All Deals" />
        <div className="pb-10">
          <CategoryOptions />
        </div>
        <Suspense fallback={<LoadingDealsList count={3} />}>
          <ApprovedDeals />
        </Suspense>
        <NeverMissADeal />
      </main>
    </Container>
  )
}
