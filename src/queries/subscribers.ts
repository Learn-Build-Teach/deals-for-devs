import prisma from '@/lib/db'
import { NewSubscriberData, Status } from '@/types'
import { Subscriber } from '@prisma/client'

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
export async function getSubscribers(limit = 50): Promise<Subscriber[]> {
  return await prisma.subscriber.findMany({
    take: limit,
    orderBy: {
      xata_createdat: 'desc',
    },
  })
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
