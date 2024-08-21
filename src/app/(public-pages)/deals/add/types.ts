import { AddDealRoutes } from '@/types/Types'

export interface FormErrors {
  [key: string]: string | undefined
}

export interface FormBlurs {
  [key: string]: boolean | undefined
}
export interface DealFormServerState {
  errors?: FormErrors
  success?: boolean
  message?: string
  redirect?: AddDealRoutes
}
