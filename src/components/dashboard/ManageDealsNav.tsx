import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface ManageDealsNavProps {
  tabIndex: number
}
export default function ManageDealsNav({ tabIndex }: ManageDealsNavProps) {
  const links = [
    { href: '/dashboard/deals', text: 'All' },
    { href: '/dashboard/deals/approved', text: 'Approved' },
    { href: '/dashboard/deals/pending', text: 'Pending' },
    { href: '/dashboard/deals/featured', text: 'Featured' },
    { href: '/dashboard/deals/reported', text: 'Reported' },
  ]

  return (
    <div className="mb-16 flex flex-col items-center gap-x-4 gap-y-4 border-white/20 md:flex-row md:border-b">
      {links.map(({ href, text }, i) => (
        <Link
          className={cn(
            'text-center text-lg text-white/75 transition-colors hover:text-white md:pb-2 lg:w-24',
            i === tabIndex && 'border-b-2 border-white font-bold text-white'
          )}
          href={href}
          key={href}
        >
          {text}
        </Link>
      ))}
    </div>
  )
}
