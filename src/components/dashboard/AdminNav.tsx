'use client'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

export default function AdminNav() {
  const { isLoaded, user } = useUser()

  return (
    <div className="fixed flex h-screen w-52 flex-col justify-between gap-y-10 bg-gray-800 px-6 py-20 text-white md:w-80">
      <div>
        <h1 className="mb-10 pl-2 text-3xl font-light text-white/70">Admin</h1>
        <div className="flex flex-col items-stretch gap-y-4">
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard"
          >
            <span className="hidden md:inline">Manage</span> Deals
          </Link>
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/subscribers"
          >
            <span className="hidden md:inline">Manage</span> Subscribers
          </Link>
          <Link
            className=" rounded p-2 text-lg transition-colors hover:bg-gray-700 hover:no-underline "
            href="/dashboard/admins"
          >
            <span className="hidden md:inline">Manage</span> Admins
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-x-4 gap-y-4 md:flex-row">
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
