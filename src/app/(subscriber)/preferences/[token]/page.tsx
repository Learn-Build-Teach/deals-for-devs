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
    <div className="flex w-full flex-col items-center">
      <div className="flex w-[600px] flex-col text-white">
        <h1 className="mb-6 text-center text-4xl uppercase text-white">
          Subscriber Preferences
        </h1>
        <Subscriber subscriber={subscriberData} />
      </div>
    </div>
  )
}
