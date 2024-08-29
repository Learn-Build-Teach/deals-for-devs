import { cn } from '@/lib/utils'
import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}
export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-16',
        className
      )}
    >
      {children}
    </div>
  )
}
