import React from 'react'
import { getXataClient } from '@/xata'
import Subscriber from '@/components/subscriber/Subscriber'
import { redirect } from 'next/navigation'
import VerifiedStatus from '@/components/subscriber/VerifiedStatus'

const client = getXataClient()

type SubscriberPreferencesProps = {
  params: {
    token: string
  }
}

export default async function SubscriberPreferences({
  params,
}: SubscriberPreferencesProps) {
  const tokenFromParams = params.token

  if (!tokenFromParams) {
    return redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token: tokenFromParams },
  })

  if (!subscriber || !subscriber.email || !subscriber.verified) {
    return redirect('/')
  }

  return (
    <div className="flex w-full flex-col items-center text-white md:-mt-28">
      <div className="mb-4 flex items-center justify-center gap-2 md:mb-6">
        <VerifiedStatus
          email={subscriber.email}
          verified={subscriber.verified}
        />
      </div>
      <h1 className="mb-1 text-center text-[34px] tracking-tight text-white md:mb-6 md:text-7xl">
        Subscriber Preferences
      </h1>
      <p className="mb-10 max-w-[300px] text-center text-xs md:mb-20 md:max-w-[953px] md:text-[28px] md:leading-10">
        Get notified via e-mail when a new deal is available in any of your
        selected categories below:
      </p>
      <div className="mb-10 w-full max-w-[300px] border border-white/[.31] md:mb-12 md:max-w-[831px]" />
      <Subscriber subscriber={subscriber} />
    </div>
  )
}
