'use client'
import { useState } from 'react'
import type { Subscribers, DealsRecord } from '@/xata'
import DealsList from '../deals/DealsList'
import SubscriberList from '@/components/subscriber/SubscriberList'

interface DashboardProps {
  deals: DealsRecord[]
  subscribers?: Subscribers[]
}

export default function Dashboard({ deals, subscribers }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState('deals')

  return (
    <div className="-mt-28 flex items-start gap-4">
      {/* header */}
      <div className="rounded-xl border border-teal-500 p-4 align-top text-white">
        <h1 className="text-center text-4xl font-extralight">
          Admin Dashboard
        </h1>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 text-sm">
          <button
            className="hover:text-teal-500 hover:underline"
            onClick={() => setSelectedTab('deals')}
          >
            Manage Deals
          </button>
          <button
            className="hover:text-teal-500 hover:underline"
            onClick={() => setSelectedTab('subscribers')}
          >
            Manage Subscribers
          </button>
        </div>
      </div>

      {selectedTab === 'deals' && <DealsList deals={deals} isAdmin={true} />}
      {selectedTab === 'subscribers' && (
        <SubscriberList subscribers={subscribers || []} />
      )}
    </div>
  )
}
