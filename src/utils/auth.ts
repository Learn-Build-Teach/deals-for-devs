import { getAdminUserById, getSuperAdminUserById } from '@/queries/adminUsers'

export const isAdminUser = async (email: string): Promise<boolean> => {
  if (!email) return false
  const adminUser = await getAdminUserById(email)
  return !!adminUser
}

export const isSuperAdminUser = async (email: string): Promise<boolean> => {
  if (!email) return false
  const adminUser = await getSuperAdminUserById(email)
  return !!adminUser
}
