import React from 'react'
import Subscriber from '@/components/subscriber/Subscriber'
import { redirect } from 'next/navigation'
import VerifiedStatus from '@/components/subscriber/VerifiedStatus'
import { getOneSubscriberByToken } from '@/lib/queries'

interface SubscriberPreferencesProps {
  searchParams: {
    token: string | undefined
  }
}

export default async function SubscriberPreferences({
  searchParams,
}: SubscriberPreferencesProps) {
  const tokenFromParams = searchParams.token

  if (!tokenFromParams) {
    return redirect('/')
  }

  const subscriber = await getOneSubscriberByToken(tokenFromParams)

  if (!subscriber || !subscriber.email || !subscriber.verified) {
    return redirect('/')
  }

  const { xata, ...subscriberData } = subscriber

  return (
    <div className="flex w-full flex-col items-center px-2 text-white md:-mt-28">
      <div className="mb-4 flex items-center justify-center gap-2 md:mb-6">
        <VerifiedStatus
          email={subscriber.email}
          verified={subscriber.verified}
        />
      </div>
      <h1 className="mb-1 text-center text-4xl tracking-tight text-white md:mb-6 md:text-7xl">
        Subscriber Preferences
      </h1>
      <p className="mb-10 max-w-72 text-center text-xs md:mb-20 md:max-w-4xl md:text-2xl md:leading-10">
        Get notified via e-mail when a new deal is available in any of your
        selected categories below:
      </p>
      <div className="mb-10 w-full max-w-72 border border-white/[.31] md:mb-12 md:max-w-4xl" />
      <Subscriber subscriber={subscriberData} />
    </div>
  )
}
