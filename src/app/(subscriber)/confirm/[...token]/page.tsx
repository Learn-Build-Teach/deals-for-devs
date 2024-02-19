import { HiOutlineExclamationCircle as Warning } from 'react-icons/hi'
import { redirect } from 'next/navigation'
import ResendConfirmation from '@/components/subscriber/ResendConfirmation'

import { getXataClient } from '@/xata'
const client = getXataClient()

type ThankYouProps = {
  params: {
    token: string
  }
}

export default async function ThankYou({ params }: ThankYouProps) {
  const token = params.token

  if (!token) {
    redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token },
  })

  if (!subscriber || !subscriber.email) {
    redirect('/')
  }

  if (subscriber.verified) {
    redirect(`/preferences/${subscriber.token}`)
  }

  const subscriberData = {
    id: subscriber.id,
    email: subscriber.email,
    verified: subscriber.verified,
    token: subscriber.token,
  }

  const email = subscriberData.email
  const confirmationLink = `http://localhost:3000/validate?token=${subscriberData.token}`

  return (
    <main className="-mt-24 flex flex-col items-center text-white">
      
      {/* email and verified status */}
      <div className="flex items-center justify-center gap-2">
        <span className="underline">{email}</span>
        <div className="flex items-center gap-2 rounded-full bg-[#F9D72238]/[.22] py-1 pl-1 pr-3">
          <Warning className="text-2xl" />
          Unverified
        </div>
      </div>

      {/* call to action */}
      <span className="mb-10 mt-6 text-4xl font-semibold tracking-tight">
        Please Verify Your Email!
      </span>
      <span>
        {`We've`} sent an email to{' '}
        <span className="font-bold underline">{email}</span>.
      </span>
      <span className="mb-12 leading-10">
        Click the link in your email to verify your account
      </span>

      {/* resend confirmation email */}
      <ResendConfirmation email={email} confirmationLink={confirmationLink} />
    </main>
  )
}
