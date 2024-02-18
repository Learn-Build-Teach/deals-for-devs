import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const environment = process.env.VERCEL_ENV

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function baseURL() {
  return environment === 'development' ?
      'http://localhost:3000'
    : 'https://dealsfordevs.com'
}
