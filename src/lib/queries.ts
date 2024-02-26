'use server'
import { revalidatePath } from 'next/cache'
import { NewSubscriberData } from '@/types/Types'

import { getXataClient, DealsRecord, Subscribers } from '@/xata'
const xataClient = getXataClient()

// deal queries
export async function getAllDeals() {
  const deals: DealsRecord[] = await xataClient.db.deals
    .sort('xata.createdAt', 'desc')
    .getMany()

  return JSON.parse(JSON.stringify(deals))
}

// subscriber queries
export async function createSubscriber(
  newSubscriberData: NewSubscriberData
): Promise<Subscribers> {
  const newSubscriber =
    await xataClient.db.subscribers.create(newSubscriberData)

  return newSubscriber
}

export async function getOneSubscriber(token: string): Promise<Subscribers> {
  const subscriber = await xataClient.db.subscribers.getFirst({
    filter: { token },
  })

  return JSON.parse(JSON.stringify(subscriber))
}

export async function getAllSubscribers(): Promise<Subscribers[]> {
  const subscribers = await xataClient.db.subscribers.getMany({})

  return JSON.parse(JSON.stringify(subscribers))
}

export async function updateSubscriberPreferences(
  id: string,
  subscriberData: Subscribers
) {
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
    status: isSubscribed ? 'subscribed' : 'unsubscribed',
  }

  await xataClient.db.subscribers.update(id, subscriber)
}

export async function deleteSubscriber(id: string) {
  const data = await xataClient.db.subscribers.delete(id)
  revalidatePath('/admin')
}
