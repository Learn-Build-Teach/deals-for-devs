'use client'
import { Category } from '@/types/Types'
import CategoryOption from './CategoryOption'
import { usePathname } from 'next/navigation'

export default function CategoryOptions() {
  const pathname = usePathname()
  const lastRoute = pathname.split('/').pop()
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <CategoryOption
          category="all"
          path="/deals"
          selected={lastRoute?.toLowerCase() === 'deals'}
        />
        {Object.values(Category).map((category) => (
          <CategoryOption
            category={category}
            key={category}
            selected={lastRoute?.toLowerCase() == category.toLowerCase()}
          />
        ))}
      </div>
    </div>
  )
}
