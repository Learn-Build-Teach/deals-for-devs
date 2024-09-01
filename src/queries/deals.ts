import prisma from '@/lib/db'
import { DealWithTags, Category } from '@/types/Types'
import { Deal } from '@prisma/client'

export async function getDeals({
  limit = 50,
  category,
  featured,
}: {
  limit?: number
  category?: Category
  featured?: boolean
}): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      ...(featured !== undefined && { featured }),
      ...(category !== undefined && { category }),
      OR: [
        {
          endDate: {
            gte: new Date(),
          },
        },
        { endDate: null },
      ],
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

export async function getDealById(id: string): Promise<DealWithTags | null> {
  return prisma.deal.findUnique({
    where: {
      xata_id: id,
      approved: true,
      OR: [
        {
          endDate: {
            gte: new Date(),
          },
        },
        { endDate: null },
      ],
    },
    include: {
      tags: true,
    },
  })
}

export async function approveDeal(id: string): Promise<DealWithTags> {
  return await prisma.deal.update({
    where: {
      xata_id: id,
    },
    include: {
      tags: true,
    },
    data: {
      approved: true,
    },
  })
}

export async function getDealCategoryCounts(): Promise<
  { category: Category; count: number }[]
> {
  const res = await prisma.deal.groupBy({
    by: ['category'],
    _count: true,
    where: {
      approved: true,
      OR: [
        {
          endDate: {
            gte: new Date(),
          },
        },
        { endDate: null },
      ],
    },
  })

  return res
    .filter((record) => record.category in Category)
    .map((record) => {
      return {
        count: record._count,
        category: record.category as Category,
      }
    })
}

export const getTotalApprovedDeals = async () => {
  return await prisma.deal.count({
    where: {
      approved: true,
      OR: [
        {
          endDate: {
            gte: new Date(),
          },
        },
        { endDate: null },
      ],
    },
  })
}

export const createDeal = async (newDeal: any) => {
  const data = await prisma.deal.create({
    data: {
      ...newDeal,
      tags: {
        connectOrCreate: newDeal.tags.map((tag: { text: string }) => ({
          where: {
            text: tag.text,
          },
          create: {
            text: tag.text,
          },
        })),
      },
    },
  })
  return data
}

export async function updateDeal(
  deal: DealWithTags,
  newTags: { text: string }[]
): Promise<DealWithTags> {
  const tagsToDelete = deal.tags.filter(
    (tag) => !newTags.find((t) => t.text === tag.text)
  )
  return await prisma.deal.update({
    where: {
      xata_id: deal.xata_id,
    },
    include: {
      tags: true,
    },
    data: {
      ...deal,
      tags: {
        connectOrCreate: newTags.map((tag) => ({
          where: {
            text: tag.text,
          },
          create: {
            text: tag.text,
          },
        })),
        deleteMany: tagsToDelete.map((tag) => ({
          text: tag.text,
        })),
      },
    },
  })
}

export async function deleteDeal(id: string): Promise<Deal> {
  return await prisma.deal.delete({
    where: {
      xata_id: id,
    },
  })
}
