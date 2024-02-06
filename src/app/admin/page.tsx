import React from 'react'
import { getXataClient } from '@/xata'
import DeleteButton from '../DeleteButton'
import SubscribeForm from '@/components/SubscribeForm'

export async function getSubscribers() {
	const client = getXataClient()
	const subscribers = await client.db.subscribers.getMany({})

	return subscribers
}

export default async function Subscribers() {
	const subscribers = await getSubscribers()

	return (
		<div className='flex justify-center flex-col items-center'>
			<h1 className='text-4xl text-white mb-12'>ADMIN DASHBOARD</h1>
			<h2 className='text-2xl text-white mb-4'>Add Subscribers</h2>
			<SubscribeForm />
			<h2 className='text-2xl text-white uppercase mt-12 mb-4'>
				Subscriber List
			</h2>
			<ul>
				{subscribers.map((subscriber) => (
					<li
						key={subscriber.email + subscriber.id}
						className='text-white w-[400px] flex justify-between'
					>
						{subscriber.email}
						<DeleteButton id={subscriber.id} />
					</li>
				))}
			</ul>
		</div>
	)
}
