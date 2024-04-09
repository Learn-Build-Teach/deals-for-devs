import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@/types/Types'

export default function CategorySelect({
  onCategoryChange,
  value,
}: {
  onCategoryChange: (category: Category) => void
  value?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-2xl font-extralight">Category *</span>
      <Select
        onValueChange={onCategoryChange}
        value={value === '' ? undefined : value}
        required
      >
        <SelectTrigger className="h-16 w-[334px] bg-transparent text-xl focus:ring-offset-teal-500">
          <SelectValue placeholder="Please select a Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(Category)
            .sort()
            .map((dealType) => (
              <SelectItem key={dealType} value={dealType} className="text-xl">
                {dealType}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
