'use server'
import {
  Category,
  DealWithTags,
  NewSubscriberData,
  Status,
} from '@/types/Types'
import prisma from './db'
import { Deal, Subscriber, Tag } from '@prisma/client'

// DEAL QUERIES
export async function getDealById(id: string): Promise<DealWithTags | null> {
  return prisma.deal.findUnique({
    where: {
      xata_id: id,
      approved: true,
    },
    include: {
      tags: true,
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

export async function getPendingAdminDeals(
  limit: number = 50
): Promise<DealWithTags[]> {
  const deals = await prisma.deal.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      xata_createdat: 'desc',
    },
    include: {
      tags: true,
    },
    take: limit,
  })
  return deals
}

export async function getAllAdminDeals(
  limit: number = 50
): Promise<DealWithTags[]> {
  const deals = await prisma.deal.findMany({
    orderBy: {
      xata_createdat: 'desc',
    },
    include: {
      tags: true,
    },
    take: limit,
  })
  return deals
}

export async function getApprovedAdminDeals(
  limit: number = 50
): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
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
export async function getFeaturedAdminDeals(
  limit: number = 50
): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      featured: true,
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

export async function getApprovedDeals(
  limit: number = 50
): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
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
    include: {
      tags: true,
    },
    take: limit,
    orderBy: {
      xata_createdat: 'desc',
    },
  })
}

export async function getApprovedDealsByCategory(
  category: Category,
  limit: number = 20
): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      category: category.toUpperCase(),
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

//TODO: get a type from prisma for new deal
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

//  connectOrCreate: {
//         where: {
//           text: 'viola@prisma.io',
//         },
//         create: {
//           text: 'viola@prisma.io',
//         },
//     }
export async function getApprovedFeaturedDeals(
  limit: number = 20
): Promise<DealWithTags[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      featured: true,
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

export async function deleteDeal(id: string): Promise<Deal> {
  return await prisma.deal.delete({
    where: {
      xata_id: id,
    },
  })
}

//SUBSCRIBER QUERIES
export async function updateSubscriberPreferences(
  xata_id: string,
  subscriberData: Subscriber
): Promise<Subscriber> {
  const {
    courseNotifications,
    ebookNotifications,
    miscNotifications,
    officeEquipmentNotifications,
    toolNotifications,
    conferenceNotifications,
  } = subscriberData

  const isSubscribed =
    courseNotifications ||
    ebookNotifications ||
    miscNotifications ||
    officeEquipmentNotifications ||
    toolNotifications ||
    conferenceNotifications

  const subscriber = {
    ...subscriberData,
    status: isSubscribed ? Status.SUBSCRIBED : Status.UNSUBSCRIBED,
  }

  return await prisma.subscriber.update({
    where: {
      xata_id,
    },
    data: subscriber,
  })
}

export async function deleteSubscriber(xata_id: string): Promise<Subscriber> {
  return await prisma.subscriber.delete({
    where: {
      xata_id,
    },
  })
}

export async function createSubscriber(
  newSubscriberData: NewSubscriberData
): Promise<Subscriber | null> {
  return await prisma.subscriber.create({
    data: newSubscriberData,
  })
}

export async function getOneSubscriberByToken(
  token: string
): Promise<Subscriber | null> {
  const res = await prisma.subscriber.findFirst({
    where: {
      token,
    },
  })

  if (!res) {
    return null
  }

  return res
}

export async function getOneSubscriberByEmail(
  email: string
): Promise<Subscriber | null> {
  return await prisma.subscriber.findFirst({
    where: {
      email,
    },
  })
}
export async function getAllSubscribers(): Promise<Subscriber[]> {
  return await prisma.subscriber.findMany()
}

export async function updateSubscriberToVerified(
  xata_id: string
): Promise<Subscriber> {
  return await prisma.subscriber.update({
    where: {
      xata_id,
    },
    data: {
      verified: true,
      status: Status.SUBSCRIBED,
    },
  })
}
