import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@/types/Types'
// import { SelectLabel } from '@radix-ui/react-select';

export default function CategorySelect({
  onCategoryChange,
}: {
  onCategoryChange: (category: Category) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-2xl font-extralight">Category *</span>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="h-16 w-[334px] bg-transparent text-xl">
          <SelectValue placeholder="E-Book" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(Category)
            .sort()
            .map((dealType) => (
              <SelectItem key={dealType} value={dealType} className='text-xl'>
                {dealType}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
