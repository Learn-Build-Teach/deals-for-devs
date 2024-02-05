'use server'
import { getXataClient } from '@/xata'

export const deleteSubscriber = async (id: string) => {
	const client = getXataClient()
	const data = await client.db.subscribers.delete(id)
	console.log(data)
}
