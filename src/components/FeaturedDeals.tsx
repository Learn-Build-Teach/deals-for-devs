import { DealRecord } from '@/xata'
import React from 'react'
import DealsList from './deals/DealsList'
import Link from 'next/link'
import { Deal } from '@prisma/client'

export default function FeaturedDeals({ deals }: { deals: Deal[] }) {
  return (
    <section className="py-20">
      <div className="flex items-center gap-x-8 pb-10">
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
      <DealsList deals={deals} />
    </section>
  )
}
