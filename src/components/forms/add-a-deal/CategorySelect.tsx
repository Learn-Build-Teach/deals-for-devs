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
      <span className="text-base font-extralight md:text-2xl">Category *</span>
      <Select
        onValueChange={onCategoryChange}
        value={value === '' ? undefined : value}
        required
      >
        <SelectTrigger className=" h-8 w-full bg-transparent text-sm focus:ring-offset-teal-500  md:h-16 md:w-[334px] md:text-xl ">
          <SelectValue placeholder="Please select a Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(Category)
            .sort()
            .map((dealType) => (
              <SelectItem
                key={dealType}
                value={dealType.toUpperCase()}
                className="text-base md:text-xl"
              >
                {dealType}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
