import prisma from '@/lib/db'

export const reportDeal = async (
  dealId: string,
  reason: string,
  email: string
) => {
  return await prisma.report.create({
    data: {
      dealId,
      reason,
      email,
    },
  })
}

export const getReportedDeals = async (take: number = 20) => {
  return await prisma.deal.findMany({
    where: {
      reports: {
        some: {},
      },
    },
  })
}

export const getReportsByDealAsAdmin = async (dealId: string) => {
  return await prisma.report.findMany({
    where: {
      dealId,
    },
  })
}
