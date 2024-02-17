import React from 'react'
import { Subscribers, getXataClient } from '@/xata'
import Subscriber from '@/components/Subscriber'
import { redirect } from 'next/navigation'

const client = getXataClient()

type SubscriberPreferencesProps = {
	params: {
		token: string
	}
}

export default async function SubscriberPreferences({
	params,
}: SubscriberPreferencesProps) {
	const token = params.token

	if (!token) {
		return redirect('/')
	}

	const subscriber = await client.db.subscribers.getFirst({
		filter: { token },
	})

	if (!subscriber) {
		return redirect('/')
	}

	const subscriberData: Subscribers = {
		id: subscriber.id,
		email: subscriber.email,
		courseNotifications: subscriber.courseNotifications,
		ebookNotifications: subscriber.ebookNotifications,
		toolNotifications: subscriber.toolNotifications,
		conferenceNotifications: subscriber.conferenceNotifications,
		miscNotifications: subscriber.miscNotifications,
		status: subscriber.status,
		verified: subscriber.verified,
	}

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='text-white flex flex-col w-[600px]'>
				<h1 className='text-4xl text-white uppercase text-center mb-6'>
					Subscriber Preferences
				</h1>
				<Subscriber subscriber={subscriberData} />
			</div>
		</div>
	)
}