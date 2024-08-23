import { getAdminUserById, getSuperAdminUserById } from '@/queries/adminUsers'

export const isAdminUser = async (userId: string): Promise<boolean> => {
  if (!userId) return false
  const adminUser = await getAdminUserById(userId)
  return !!adminUser
}

export const isSuperAdminUser = async (userId: string): Promise<boolean> => {
  if (!userId) return false
  const adminUser = await getSuperAdminUserById(userId)
  return !!adminUser
}
