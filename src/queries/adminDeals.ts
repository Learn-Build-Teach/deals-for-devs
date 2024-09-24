import prisma from '@/lib/db'
import { Category, DealWithTags } from '@/types'

export async function getAdminDeals({
  limit = 50,
  approved = true,
  category,
  featured,
}: {
  limit?: number
  approved?: boolean
  category?: Category
  featured?: boolean
}): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      ...(featured !== undefined && { featured }),
      ...(approved !== undefined && { approved }),
      ...(category !== undefined && { category }),
    },
    include: {
      tags: true,
    },
    take: limit,
    orderBy: {
      xata_createdat: 'desc',
    },
  })
}

export async function getDealByIdAsAdmin(
  id: string
): Promise<DealWithTags | null> {
  return prisma.deal.findUnique({
    where: {
      xata_id: id,
    },
    include: {
      tags: true,
    },
  })
}
