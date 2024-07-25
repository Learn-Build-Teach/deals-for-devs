import CategoryOptions from '@/components/CategoryOptions'
import NeverMissADeal from '@/components/NeverMissADeal'
import PageHeader from '@/components/PageHeader'
import ApprovedDeals from '@/components/deals/ApprovedDeals'
import LoadingDealsList from '@/components/deals/loading/LoadingDealsList'
import { Suspense } from 'react'

export const revalidate = 120

export default async function DealsPage() {
  //TODO: handle error
  return (
    <main>
      <div className="pb-10">
        <PageHeader title="All Deals" />
      </div>
      <div className="pb-10">
        <CategoryOptions />
      </div>
      <Suspense fallback={<LoadingDealsList count={3} />}>
        <ApprovedDeals />
      </Suspense>
      <NeverMissADeal />
    </main>
  )
}
