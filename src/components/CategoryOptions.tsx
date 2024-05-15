import { Category } from '@/types/Types'
import Link from 'next/link'

export default function CategoryOptions() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xl text-gray-100">Categories:</span>
        <Link
          href={`/deals`}
          className="rounded-xl bg-teal-600 px-4 py-2 text-teal-100"
        >
          all
        </Link>
        {Object.values(Category).map((category) => (
          <Link
            href={`/deals/${category}`}
            key={category}
            className="rounded-xl bg-teal-600 px-4 py-2 text-teal-100"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}
