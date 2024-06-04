'use server'
import { Category, NewSubscriberData, Status } from '@/types/Types'
import prisma from './db'
import { Deal, Subscriber } from '@prisma/client'

// deal queries
export async function getAllDeals() {
  const deals = await prisma.deal.findMany({
    orderBy: {
      xata_createdat: 'desc',
    },
  })
  return deals
}

export async function getDealById(id: string): Promise<Deal | null> {
  return await prisma.deal.findUnique({
    where: {
      id,
      approved: true,
    },
  })
}

export async function getAllUnapprovedDeals() {
  const deals = await prisma.deal.findMany({
    where: {
      approved: false,
    },
    orderBy: {
      xata_createdat: 'desc',
    },
  })
  return deals
}

// subscriber queries
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
  id: string
): Promise<Subscriber> {
  return await prisma.subscriber.update({
    where: {
      id,
    },
    data: {
      verified: true,
      status: Status.SUBSCRIBED,
    },
  })
}

export async function approveDeal(id: string): Promise<Deal> {
  return await prisma.deal.update({
    where: {
      id,
    },
    data: {
      approved: true,
    },
  })
}

export async function getRecentApprovedDealsByDate(
  date: Date
): Promise<Deal[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      xata_createdat: {
        gte: date,
      },
    },
  })
}

export async function getApprovedDeals(limit: number = 20): Promise<Deal[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
    },
    take: limit,
  })
}
export async function getApprovedDealsByCategory(
  category: Category
): Promise<Deal[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      category: category.toUpperCase(),
    },
  })
}

//TODO: get a type from prisma for new deal
export const createDeal = async (newDeal: any) => {
  const data = await prisma.deal.create({
    data: newDeal,
  })

  return data
}

export const getAdminUserById = async (userId: string) => {
  return await prisma.adminUser.findUnique({
    where: {
      userId,
    },
  })
}

export async function getApprovedFeaturedDeals(
  limit: number = 20
): Promise<Deal[]> {
  return await prisma.deal.findMany({
    where: {
      approved: true,
      featured: true,
    },
    take: limit,
  })
}

export async function updateSubscriberPreferences(
  id: string,
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
      id,
    },
    data: subscriber,
  })
}

export async function deleteSubscriber(id: string): Promise<Subscriber> {
  return await prisma.subscriber.delete({
    where: {
      id,
    },
  })
}

export async function deleteDeal(id: string): Promise<Deal> {
  return await prisma.deal.delete({
    where: {
      id,
    },
  })
}
