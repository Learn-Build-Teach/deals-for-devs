import { env } from '@/env'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const baseURL = env.NEXT_PUBLIC_BASE_URL

// validate email link
export const createValidateEmailLink = (token: string) => {
  return `${baseURL}/api/validate?token=${token}`
}

// confirm email link
export const createConfirmEmailLink = (token: string) => {
  return `${baseURL}/confirm?token=${token}`
}

// user preference link
export const createPreferencesLink = (token: string) => {
  return `${baseURL}/preferences?token=${token}`
}

// unsubscribe link
export const createUnsubscribeLink = (token: string) => {
  return `${baseURL}/api/unsubscribe?token=${token}`
}

// convert to camelCase
export const camelCase = (str: string) => {
  let camelCase = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')

  return camelCase
}
