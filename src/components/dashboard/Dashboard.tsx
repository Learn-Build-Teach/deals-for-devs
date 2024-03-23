'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <div className="grid space-y-4 rounded-xl border border-teal-500 p-4 text-white">
        <h1 className="text-center text-3xl font-extralight">
          Admin Dashboard
        </h1>
        <div className="flex flex-col items-center gap-2 text-sm">
          <Link
            className="hover:text-teal-500 hover:underline"
            href="/dashboard/deals"
          >
            Manage Deals
          </Link>
          <Link
            className="hover:text-teal-500 hover:underline"
            href="/dashboard/subscribers"
          >
            Manage Subscribers
          </Link>
        </div>
      </div>
    </div>
  )
}
