'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearch } from './SearchContext';

export default function Nav() {
  const { user, isLoaded } = useUser();
  const { setSearchOpen } = useSearch();

  return (
    <header>
      <nav
        className="flex flex-col sm:flex-row items-center justify-between p-6 lg:px-8 h-20 gap-y-4"
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5">
          <Image src="/logo-teal.png" alt="me" height="48" width={30} />
        </a>

        <div className=" flex flex-1 justify-end gap-x-4 items-center">
          <Link
            href="/deals"
            className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  "
          >
            All Deals
          </Link>
          {isLoaded && user && (
            <>
              <Link
                href="/dashboard"
                className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  "
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}

          <Link
            href="/deals/add"
            className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center"
          >
            Add a Deal
          </Link>
          <div className="text-center">
            <button
              className="border-2 hover:border-gray-100 text-sm  border-gray-500 px-4 py-1 rounded-md text-gray-100 w-[200px] items-center flex justify-between"
              onClick={() => setSearchOpen(true)}
            >
              Search{' '}
              <span className="border border-gray-500 px-3 py-1 rounded-md text-sm">
                /
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
