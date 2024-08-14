import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function FeaturedSelect({
  onFeaturedChange,
  value,
  error,
}: {
  onFeaturedChange: (featuredStr: string) => void
  value: boolean
  error?: string
}) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label
          className="text-base font-extralight md:text-2xl"
          htmlFor="featured"
        >
          Featured *
        </label>
        <Select
          onValueChange={onFeaturedChange}
          name="featured"
          value={value ? 'true' : 'false'}
          required
        >
          <SelectTrigger
            className={cn(
              `h-8 w-full bg-transparent text-sm  md:h-16 md:text-xl`,
              error ?
                'border-red-500 focus:ring-offset-red-500 '
              : 'focus:ring-offset-teal-500 focus-visible:ring-offset-4 '
            )}
            aria-label="Featured"
            id="featured"
          >
            <SelectValue placeholder="Is this deal featured?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'true'} className="text-base md:text-xl">
              Yes
            </SelectItem>
            <SelectItem value={'false'} className="text-base md:text-xl">
              No
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-6">
        <small className="text-red-500">{error}</small>
      </div>
    </div>
  )
}
