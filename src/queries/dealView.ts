import prisma from '@/lib/db'

export const createDealView = async (dealId: string) => {
  return await prisma.dealView.create({
    data: {
      dealId,
    },
  })
}

export const getViewsByDeal = async (take: number = 20) => {
  return await prisma.deal.findMany({
    select: {
      _count: {
        select: { views: true },
      },
      name: true,
      xata_id: true,
    },
    orderBy: {
      views: {
        _count: 'desc',
      },
    },
    take,
  })
}
