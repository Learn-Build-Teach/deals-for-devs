'use server'
import { Subscribers, getXataClient } from '@/xata'

export async function updatePreferences(
	id: string,
	subscriberData: Subscribers
) {
	const client = getXataClient()

	await client.db.subscribers.update(id, {
		courseNotifications: subscriberData.courseNotifications,
		ebookNotifications: subscriberData.ebookNotifications,
		miscNotifications: subscriberData.miscNotifications,
		officeEquipmentNotifications: subscriberData.officeEquipmentNotifications,
		toolNotifications: subscriberData.toolNotifications,
		conferenceNotifications: subscriberData.conferenceNotifications,
	})
}
