import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function CategoryOption({
  category,
  path,
  selected = false,
}: {
  category: string
  path?: string
  selected?: boolean
}) {
  return (
    <Link
      href={path || `/deals/category/${category}`}
      className={twMerge(
        'rounded-full  border border-white px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:border-teal-500 hover:text-teal-500',
        selected ?
          'text-primary hover:text-primary border-teal-500 bg-teal-500'
        : ''
      )}
    >
      {category}
    </Link>
  )
}
