import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function CategoryOption({
  category,
  path,
  selected = false,
  count,
}: {
  category: string
  path?: string
  selected?: boolean
  count: number
}) {
  return (
    <Link
      href={path || `/deals/category/${category}`}
      className={twMerge(
        'flex items-center gap-x-2 rounded-full border border-white px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:border-teal-500 hover:text-teal-500',
        selected ?
          'text-primary hover:text-primary border-teal-500 bg-teal-500'
        : ''
      )}
    >
      <span>{category}</span>
      <span
        className={cn(
          `rounded-full bg-teal-700 px-2 text-sm text-teal-100  `,
          {}
        )}
      >
        {count}
      </span>
    </Link>
  )
}
