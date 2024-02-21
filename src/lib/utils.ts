import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const environment = process.env.VERCEL_ENV

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
