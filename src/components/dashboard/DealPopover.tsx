import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import EditButton from './EditButton'
import DeleteDealButton from './DeleteDealButton'
import { FaEllipsisV } from 'react-icons/fa'

interface DealPopoverProps {
  id: string
}
export function DealPopover({ id }: DealPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <FaEllipsisV />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <EditButton id={id} />
          <DeleteDealButton id={id} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
