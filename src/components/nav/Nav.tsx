'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { GoSearch } from 'react-icons/go'
import { useSearch } from '../SearchContext'
import NavLink from './NavLink'
import Separator from './Separator'
import { cn } from '@/lib/utils'

export default function Nav() {
  const { user, isLoaded } = useUser()
  const { setSearchOpen } = useSearch()

  const isUserAuthenticated = user && isLoaded

  return (
    <header>
      <nav
        className={cn(
          'mb-[79px] flex w-full items-center px-6 md:mb-[153px] md:px-0'
        )}
        aria-label="Global"
      >
        {/* D4D logo */}
        <Link href="/">
          <Image
            src="/logo-teal.png"
            alt="me"
            height="88"
            width="54"
            className="h-[70px] w-[42px]  md:h-[88px] md:w-[54px]"
          />
        </Link>

        {/* nav links */}
        <div className=" flex flex-1 flex-row items-center justify-end gap-x-5 gap-y-2">
          <NavLink href="/deals">Shop All Deals</NavLink>
          <NavLink href="/deals/add">Add a deal</NavLink>

          {/* admin dashboard */}
          {isUserAuthenticated && (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <Separator />
            </>
          )}

          {/* search */}
          <button className="text-white" onClick={() => setSearchOpen(true)}>
            <GoSearch className="h-4 w-4 md:h-7 md:w-7" />
          </button>

          {/* user logout */}
          {isUserAuthenticated && (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
