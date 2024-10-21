import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
  {
    variants: {
      variant: {
        default:
          'bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90',
        destructive:
          'bg-red-700 text-gray-50 hover:bg-red-700/90 dark:bg-red-800 dark:text-gray-50 dark:hover:bg-red-800/90',
        success:
          'bg-green-800 text-gray-50 hover:bg-green-800/90 dark:bg-green-800 dark:text-gray-50 dark:hover:bg-green-800/90',
        outline:
          'border border-gray-400 bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-700 ',
        'outline-success':
          'border border-teal-400 bg-transparent text-teal-400 hover:text-teal-200  hover:bg-teal-900 ',
        'outline-destructive':
          'border border-red-400 bg-transparent text-red-400 hover:text-red-950 hover:border-red-400  hover:bg-red-400 ',
        'light-destructive':
          'border border-red-100 bg-red-100 text-red-400 hover:text-red-400 hover:border-red-400  hover:bg-white ',
        primary: 'bg-teal-500 text-gray-900 hover:bg-teal-300/80',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80',
        'ghost-light': ' hover:text-gray-300 text-gray-50',
        link: 'text-gray-200 underline-offset-4 hover:underline dark:text-gray-50 ',
        'link-destructive': 'text-red-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 py-6 rounded-md px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  asLink?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      asLink = false,
      href,
      ...props
    },
    ref
  ) => {
    if (asLink && href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={href}
        >
          {props.children}
        </Link>
      )
    }
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
