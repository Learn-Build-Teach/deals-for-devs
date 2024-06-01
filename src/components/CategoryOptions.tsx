import { Category } from '@/types/Types'
import CategoryOption from './CategoryOption'

export default function CategoryOptions() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <CategoryOption category="all" path="/deals" />
        {Object.values(Category).map((category) => (
          <CategoryOption category={category} key={category} />
        ))}
      </div>
    </div>
  )
}
