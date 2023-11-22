'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearch } from './SearchContext';
import { FaSearch } from 'react-icons/fa';

export default function Nav() {
  const { user, isLoaded } = useUser();
  const { setSearchOpen } = useSearch();

  return (
    <header>
      <nav
        className="flex sm:flex-row flex-col items-center justify-between p-6 lg:px-8 sm:h-20 gap-y-4"
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5">
          <Image src="/logo-teal.png" alt="me" height="48" width={30} />
        </a>

        <div className=" flex flex-1 flex-row justify-end gap-x-4 items-center gap-y-2">
          <Link
            href="/deals"
            className="rounded-md  py-2.5 text-sm font-semibold text-white shadow-sm  "
          >
            <span className="hidden sm:inline">All</span> Deals
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
            Add <span className="hidden sm:inline"> a Deal</span>
          </Link>
          <div className="text-center">
            <button
              className="border-2 hover:border-gray-100 text-sm  border-gray-500 px-4 py-1 rounded-md text-gray-100 sm:w-[200px] h-10"
              onClick={() => setSearchOpen(true)}
            >
              <span className="items-center justify-between hidden sm:flex">
                <span className="">Search </span>
                <span className="border border-gray-500 px-3 py-1 rounded-md text-sm">
                  /
                </span>
              </span>
              <span className="py-1 flex sm:hidden">
                <FaSearch />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
