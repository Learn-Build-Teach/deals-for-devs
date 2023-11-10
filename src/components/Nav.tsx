'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            BF Deals
          </a>
        </div>

        <div className=" flex flex-1 justify-end gap-x-4 items-center">
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
        </div>
      </nav>
    </header>
  );
}
