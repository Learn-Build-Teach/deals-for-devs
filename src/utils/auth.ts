import { getAdminUserById } from '@/lib/queries'

export const isAdminUser = async (userId: string): Promise<boolean> => {
  if (!userId) return false
  const adminUser = await getAdminUserById(userId)
  return !!adminUser
}
