'use client'
import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (date: Date | undefined) => void
  initialDate: Date | undefined
}

export function DatePicker({
  className,
  onDateChange,
  initialDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate)

  const handleOnSelect = (date: Date | undefined) => {
    onDateChange(date)
    setDate(date)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'h-16  w-full justify-start bg-transparent text-lg font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
