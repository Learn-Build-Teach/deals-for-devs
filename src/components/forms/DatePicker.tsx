'use client'
import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateRangeChange: (range: DateRange) => void
  initialFrom: Date
  initialTo: Date
}

export function DatePickerWithRange({
  className,
  onDateRangeChange,
  initialFrom,
  initialTo,
}: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialFrom,
    to: initialTo,
  })

  const handleOnSelect = (range: DateRange | undefined) => {
    setDate(range)
    onDateRangeChange(range || { from: undefined, to: undefined })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'flex h-16 w-full items-center justify-start gap-4 bg-transparent text-left text-sm font-normal hover:bg-transparent hover:text-white md:text-xl',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-6 w-6" />
            {date?.from ?
              date.to ?
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              : format(date.from, 'LLL dd, y')
            : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleOnSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
