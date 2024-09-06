import React from 'react'
import { cn } from '@/lib/utils'

export enum SECTION_STYLE {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum SECTION_WIDTH {
  LG = 'LG',
  MD = 'MD',
  SM = 'SM',
}

export const SECTION_WIDTH_MAP = {
  [SECTION_WIDTH.LG]: 'max-w-7xl',
  [SECTION_WIDTH.MD]: 'max-w-6xl',
  [SECTION_WIDTH.SM]: 'max-w-4xl',
}

interface SectionProps {
  children: React.ReactNode
  style?: SECTION_STYLE
  className?: string
  width?: SECTION_WIDTH
}
export default function Section({
  children,
  style = SECTION_STYLE.DARK,
  className,
  width = SECTION_WIDTH.LG,
}: SectionProps) {
  return (
    <div
      className={cn(
        `py-16`,
        {
          'bg-white text-gray-800': style === SECTION_STYLE.LIGHT,
        },
        className
      )}
    >
      <div className={cn('mx-auto w-full max-w-7xl', SECTION_WIDTH_MAP[width])}>
        {children}
      </div>
    </div>
  )
}
