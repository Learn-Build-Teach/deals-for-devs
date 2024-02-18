'use client'
import { useEffect, useState } from 'react'
import { Subscribers } from '@/xata'
import { cn } from '@/lib/utils'
import { updatePreferences } from '@/actions/subscriber-update'
import toast from 'react-hot-toast'

export default function Subscriber({
	subscriber,
}: {
	subscriber: Subscribers
}) {
	const [subscriberData, setSubscriberData] = useState(subscriber)
	const [update, setUpdate] = useState(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target
		setSubscriberData((prevData) => ({
			...prevData,
			[name]: checked,
		}))

		setUpdate(true)
	}

	const updateSubscriptions = async (val: boolean) => {
		// Create a new object with the updated values
		const newData = {
			...subscriberData,
			courseNotifications: val,
			ebookNotifications: val,
			toolNotifications: val,
			conferenceNotifications: val,
			miscNotifications: val,
			status: val ? 'subscribed' : 'unsubscribed',
		}

		// Update the state
		setSubscriberData((prevData) => ({
			...prevData,
			...newData,
		}))

		// Update the database
		try {
			await updatePreferences(subscriberData.id, newData)
			toast.success(
				`You have been ${
					val ? 'subscribed to' : 'unsubscribed from'
				} all notifications!`
			)
		} catch (error) {
			toast.error(`Failed to update database: ${error}`)
		}
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
						checked={subscriberData.courseNotifications ?? false}
						onChange={handleChange}
					/>
					Course Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='ebookNotifications'
						type='checkbox'
						checked={subscriberData.ebookNotifications ?? false}
						onChange={handleChange}
					/>
					Ebook Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='toolNotifications'
						type='checkbox'
						checked={subscriberData.toolNotifications ?? false}
						onChange={handleChange}
					/>
					Tool Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='conferenceNotifications'
						type='checkbox'
						checked={subscriberData.conferenceNotifications ?? false}
						onChange={handleChange}
					/>
					Conference Notifications
				</li>
				<li className='flex items-center gap-4'>
					<input
						name='miscNotifications'
						type='checkbox'
						checked={subscriberData.miscNotifications ?? false}
						onChange={handleChange}
					/>
					Misc Notifications
				</li>
			</ul>
			<div className='flex flex-col gap-2 mt-6'>
				<div className='flex gap-2'>
					<button
						className='uppercase rounded-md bg-teal-600 px-3.5 w-1/2 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center'
						onClick={() => updateSubscriptions(true)}
					>
						subscribe to all
					</button>

					<button
						className='rounded-md bg-red-600 w-1/2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center uppercase'
						onClick={() => updateSubscriptions(false)}
					>
						unsubscribe from all
					</button>
				</div>
				<button
					className='uppercase rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500  text-center disabled:bg-slate-300 disabled:text-black/10'
					onClick={async () => {
						await updatePreferences(subscriberData.id, subscriberData)
						toast.success('Preferences updated!')
						setUpdate(false)
					}}
					disabled={!update}
				>
					update preferences
				</button>
			</div>
		</>
	)
}
