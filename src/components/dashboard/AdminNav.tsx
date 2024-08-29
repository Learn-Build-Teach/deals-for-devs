'use client'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

export default function AdminNav() {
  const { isLoaded, user } = useUser()

  return (
    <div className="fixed flex h-screen w-60 flex-col justify-between gap-y-10 bg-gray-800 px-6 py-20 text-white ">
      <div>
        <Link href="/dashboard">
          <h1 className="mb-10 pl-2 text-3xl font-light text-white/70">
            Admin
          </h1>
        </Link>
        <div className="flex flex-col items-stretch gap-y-3">
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/deals"
          >
            Deals
          </Link>
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/subscribers"
          >
            Subscribers
          </Link>
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/admins"
          >
            Admins
          </Link>
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/metrics"
          >
            Metrics
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-x-4 gap-y-4">
        <UserButton />
        <div>
          {isLoaded && user?.fullName && <p className="">{user.fullName}</p>}
          {isLoaded && user?.primaryEmailAddress && (
            <p className="text-sm">{user.primaryEmailAddress.emailAddress}</p>
          )}
        </div>
      </div>
    </div>
  )
}
