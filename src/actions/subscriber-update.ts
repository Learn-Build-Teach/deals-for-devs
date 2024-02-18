'use server'
import { Subscribers, getXataClient } from '@/xata'
const client = getXataClient()

export async function updatePreferences(
	id: string,
	subscriberData: Subscribers
) {
	// Determine if the user is subscribed to any notifications
	const isSubscribed =
		subscriberData.courseNotifications ||
		subscriberData.ebookNotifications ||
		subscriberData.miscNotifications ||
		subscriberData.officeEquipmentNotifications ||
		subscriberData.toolNotifications ||
		subscriberData.conferenceNotifications

	const subscriber = {
		...subscriberData,
		status: isSubscribed ? 'subscribed' : 'unsubscribed',
	}

	await client.db.subscribers.update(id, subscriber)
}
