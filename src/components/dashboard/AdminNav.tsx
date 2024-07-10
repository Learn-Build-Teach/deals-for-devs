'use client'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function AdminNav() {
  return (
    <div>
      <div className="grid space-y-4 rounded-xl border border-teal-500 p-4 text-white">
        <h1 className="text-center text-3xl font-extralight">
          Admin Dashboard
        </h1>
        <div className="flex flex-col items-center gap-2 text-sm">
          <UserButton />
          <Link
            className="hover:text-teal-500 hover:underline"
            href="/admin/dashboard"
          >
            Manage Deals
          </Link>
          <Link
            className="hover:text-teal-500 hover:underline"
            href="/admin/dashboard/subscribers"
          >
            Manage Subscribers
          </Link>
        </div>
      </div>
    </div>
  )
}
