'use server'
import { getXataClient } from '@/xata'
import { revalidatePath } from 'next/cache'

export const deleteSubscriber = async (id: string) => {
	const client = getXataClient()
	const data = await client.db.subscribers.delete(id)
	revalidatePath('/admin')
}
