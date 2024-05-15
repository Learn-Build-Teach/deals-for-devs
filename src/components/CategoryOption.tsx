import Link from 'next/link'
import React from 'react'

export default function CategoryOption({ category }: { category: string }) {
  return (
    <Link
      href={`/deals/${category}`}
      className="rounded-full border border-white px-4 py-2 text-white"
    >
      {category}
    </Link>
  )
}
