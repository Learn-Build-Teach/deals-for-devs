import Link from 'next/link'
import React from 'react'

export default function CategoryOption({
  category,
  path,
}: {
  category: string
  path?: string
}) {
  return (
    <Link
      href={path || `/deals/${category}`}
      className="rounded-full border border-white px-4 py-2 text-white"
    >
      {category}
    </Link>
  )
}
