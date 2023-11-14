'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 "
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5">
          <Image src="/logo-teal.png" alt="me" height="48" width={30} />
        </a>

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
