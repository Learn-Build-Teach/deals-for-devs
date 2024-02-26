import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// base URL based on development environment (development or production)
const baseURL = process.env.VERCEL_URL

// validate email link
export const createValidateEmailLink = (token: string) => {
  return `${baseURL}/api/validate?token=${token}`
}

// confirm email link
export const createConfirmEmailLink = (token: string) => {
  return `${baseURL}/confirm?token=${token}`
}

// user preference li nk
export const createPreferencesLink = (token: string) => {
  return `${baseURL}/preferences?token=${token}`
}

// unsubscribe link
export const createUnsubscribeLink = (token: string) => {
  return `${baseURL}/api/unsubscribe?token=${token}`
}
