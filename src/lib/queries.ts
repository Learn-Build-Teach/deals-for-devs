import { getXataClient, DealsRecord } from '@/xata'
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
