import Link from 'next/link'
import FeaturedDeals from './FeaturedDeals'
import { Suspense } from 'react'
import LoadingDealsList from './loading/LoadingDealsList'

export default function FeaturedDealsSection() {
  return (
    <section className="py-20">
      <div className="flex flex-col items-center gap-x-8 gap-y-4 pb-10 md:flex-row">
        <h2 className="text-4xl font-bold tracking-tight text-gray-100">
          Hottest Deals
        </h2>

        <Link
          href="/deals"
          className="text-lg text-gray-200 underline hover:text-teal-500"
        >
          View all deals
        </Link>
      </div>
      <Suspense fallback={<LoadingDealsList count={3} />}>
        <FeaturedDeals />
      </Suspense>
    </section>
  )
}
