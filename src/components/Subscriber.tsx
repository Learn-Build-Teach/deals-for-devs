'use client'
import { useState } from 'react'
import { Subscribers } from '@/xata'
import { cn } from '@/lib/utils'
import { updatePreferences } from '@/actions/updatePreferences'
import toast from 'react-hot-toast'

export default function Subscriber({
	subscriber,
}: {
	subscriber: Subscribers
}) {
	const [subscriberData, setSubscriberData] = useState(subscriber)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		setSubscriberData((prevData) => ({
			...prevData,
			[name]: checked,
		}))
	}

	return (
		<>
			<p className={subscriber.verified ? 'mb-6 flex items-center gap-2' : ''}>
				<span>Email: {subscriberData.email}</span>
				<span className={cn(subscriber.verified ? '' : 'hidden')}>✅</span>
			</p>
			<p className={cn('text-red-600 mb-6', subscriber.verified && 'hidden')}>
				Please Verify Email to receive email notification!
			</p>

			<p>Subscribed to:</p>
			<ul>
				<li className='flex items-center gap-4'>
					<input
						name='courseNotifications'
						type='checkbox'
						defaultChecked={subscriberData.courseNotifications ?? false}
						onChange={handleChange}
					/>
					Course Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='ebookNotifications'
						type='checkbox'
						defaultChecked={subscriberData.ebookNotifications ?? false}
						onChange={handleChange}
					/>
					Ebook Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='toolNotifications'
						type='checkbox'
						defaultChecked={subscriberData.toolNotifications ?? false}
						onChange={handleChange}
					/>
					Tool Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='conferenceNotifications'
						type='checkbox'
						defaultChecked={subscriberData.conferenceNotifications ?? false}
						onChange={handleChange}
					/>
					Conference Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='miscNotifications'
						type='checkbox'
						defaultChecked={subscriberData.miscNotifications ?? false}
						onChange={handleChange}
					/>
					Misc Notifications
				</li>
			</ul>
			<div className='flex flex-col gap-2 mt-6'>
				<button
					className='uppercase rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center'
					onClick={async () => {
						await updatePreferences(subscriberData.id, subscriberData)
						toast.success('Preferences updated!')
					}}
				>
					update preferences
				</button>
				<button className='rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center uppercase'>
					unsubscribe
				</button>
			</div>
		</>
	)
}
