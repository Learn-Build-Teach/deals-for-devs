import prisma from '@/lib/db'
import { AdminUser } from '@prisma/client'

export async function getAllAdminUsers(
  limit: number = 20
): Promise<AdminUser[]> {
  return await prisma.adminUser.findMany({
    take: limit,
    orderBy: {
      xata_createdat: 'desc',
    },
  })
}

export async function deleteAdminUser(id: string): Promise<void> {
  await prisma.adminUser.delete({
    where: {
      xata_id: id,
    },
  })
}

export const getAdminUserById = async (email: string) => {
  return await prisma.adminUser.findUnique({
    where: {
      email,
    },
  })
}

export const getSuperAdminUserById = async (email: string) => {
  return await prisma.adminUser.findUnique({
    where: {
      email,
      isSuperAdmin: true,
    },
  })
}

export const createAdminUser = async (email: string) => {
  return await prisma.adminUser.create({
    data: {
      email,
    },
  })
}
