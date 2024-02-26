import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// base URL based on development environment (development or production)
export const baseUrl = process.env.BASE_URL

// validate email link
export const createValidateEmailLink = (token: string) => {
  return `${baseUrl}/api/validate?token=${token}`
}

// confirm email link
export const createConfirmEmailLink = (token: string) => {
  return `${baseUrl}/confirm?token=${token}`
}

// user preference li nk
export const createUserPreferencesLink = (token: string) => {
  return `${baseUrl}/preferences?token=${token}`
}

// unsubscribe link
export const createUnsubscribeLink = (token: string) => {
  return `${baseUrl}/api/unsubscribe?token=${token}`
}
