import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/Types';
// import { SelectLabel } from '@radix-ui/react-select';

export default function CategorySelect({
  onCategoryChange,
}: {
  onCategoryChange: (category: Category) => void;
}) {
  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Course" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Category)
          .sort()
          .map((dealType) => (
            <SelectItem key={dealType} value={dealType}>
              {dealType}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
