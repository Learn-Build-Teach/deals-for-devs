import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = process.env.BASE_URL

// validate email link
export const createValidateEmailLink = (token: string) => {
  return `${baseUrl}/api/validate?token=${token}`
}
