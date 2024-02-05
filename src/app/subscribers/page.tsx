import React from 'react'
import { getXataClient } from '@/xata'
import DeleteButton from '../DeleteButton'

export async function getSubscribers() {
	const client = getXataClient()
	const subscribers = await client.db.subscribers.getMany({})

	return subscribers
}

export default async function Subscribers() {
	const subscribers = await getSubscribers()

	return (
		<div className='flex justify-center flex-col items-center'>
			<h1 className='text-4xl text-white uppercase mb-4'>Subscribers</h1>
			<ul>
				{subscribers.map((subscriber) => (
					<li
						key={subscriber.id}
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
