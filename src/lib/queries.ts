'use server'
import { revalidatePath } from 'next/cache'
import { getXataClient, DealsRecord, Subscribers } from '@/xata'
const xataClient = getXataClient()

export async function getAllDeals() {
  const deals: DealsRecord[] = await xataClient.db.deals
    .sort('xata.createdAt', 'desc')
    .getMany()

  return JSON.parse(JSON.stringify(deals))
}

export async function getAllSubscribers() {
  const subscribers = await xataClient.db.subscribers.getMany({})

  return JSON.parse(JSON.stringify(subscribers))
}

export async function deleteSubscriber(id: string) {
  const data = await xataClient.db.subscribers.delete(id)
  revalidatePath('/admin')
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
  revalidatePath('/admin')
}
