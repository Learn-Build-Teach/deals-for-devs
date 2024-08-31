import { Category } from '@/types/Types'
import CategoryOption from './CategoryOption'
import { getDealCategoryCounts, getTotalApprovedDeals } from '@/queries/deals'

interface CategoryOptionsProps {
  selectedCategory?: Category
}
export default async function CategoryOptions({
  selectedCategory,
}: CategoryOptionsProps) {
  const categoryCounts = await getDealCategoryCounts()
  const totalDeals = await getTotalApprovedDeals()

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <CategoryOption
          category="ALL"
          path="/deals"
          count={totalDeals}
          selected={!selectedCategory}
        />
        {categoryCounts
          .filter((categoryCount) => categoryCount.count > 0)
          .map((categoryCount) => (
            <CategoryOption
              category={categoryCount.category}
              key={categoryCount.category}
              count={categoryCount.count}
              selected={
                selectedCategory?.toUpperCase() ==
                categoryCount.category.toUpperCase()
              }
            />
          ))}
      </div>
    </div>
  )
}
