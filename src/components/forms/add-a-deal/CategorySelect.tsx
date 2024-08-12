import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Category } from '@/types/Types'

export default function CategorySelect({
  onCategoryChange,
  value,
  error,
  required = false,
  onBlur,
}: {
  onCategoryChange: (category: Category) => void
  value?: string
  error?: string
  required?: boolean
  onBlur?: () => void
}) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label
          className="text-base font-extralight md:text-2xl"
          htmlFor="category"
        >
          Category *
        </label>
        <Select
          onValueChange={onCategoryChange}
          name="category"
          value={value === '' ? undefined : value}
          required={required}
        >
          <SelectTrigger
            className={cn(
              `h-8 w-full bg-transparent text-sm  md:h-16 md:w-[334px] md:text-xl`,
              error ?
                'border-red-500 focus:ring-offset-red-500 '
              : 'focus:ring-offset-teal-500 focus-visible:ring-offset-4 '
            )}
            aria-label="Category"
            id="category"
          >
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
      <div className="h-6">
        <small className="text-red-500">{error}</small>
      </div>
    </div>
  )
}
