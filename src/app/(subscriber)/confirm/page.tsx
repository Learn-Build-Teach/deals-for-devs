import { HiOutlineExclamationCircle as Warning } from 'react-icons/hi'
import { redirect } from 'next/navigation'
import ResendConfirmation from '@/components/subscriber/ResendConfirmation'
import { createValidateEmailLink } from '@/lib/utils'

import { getXataClient } from '@/xata'
const client = getXataClient()
interface ConfirmEmailProps {
  searchParams: {
    token: string | undefined
  }
}

//TODO: Add polling cycling to check email verification status
export default async function ConfirmEmail({
  searchParams,
}: ConfirmEmailProps) {
  const tokenFromParams = searchParams.token

  if (!tokenFromParams) {
    redirect('/')
  }

  const subscriber = await client.db.subscribers.getFirst({
    filter: { token: tokenFromParams },
  })

  if (!subscriber || !subscriber.email) {
    redirect('/')
  }

  const { email, verified, token } = subscriber

  if (verified) {
    redirect(`/preferences?token=${token}`)
  }

  const validateEmailLink = createValidateEmailLink(token as string)

  return (
    <main className="mx-auto -mt-24 flex w-1/3 flex-col items-center rounded-xl border border-white p-6 text-white shadow-xl shadow-white/5">
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
      <ResendConfirmation email={email} validateEmailLink={validateEmailLink} />
    </main>
  )
}
