import ResendConfirmationButton from '@/components/subscriber/ResendConfirmationButton'
import { createValidateEmailLink } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { createPreferencesLink } from '@/lib/utils'
import { getOneSubscriberByToken } from '@/lib/queries'
import VerifiedStatus from '@/components/subscriber/VerifiedStatus'

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
    return redirect('/')
  }

  const subscriber = await getOneSubscriberByToken(tokenFromParams)

  if (!subscriber || !subscriber.email) {
    return redirect('/')
  }

  const { email, verified } = subscriber

  if (verified) {
    const preferencesLink = createPreferencesLink(tokenFromParams)
    return redirect(preferencesLink)
  }

  const validateEmailLink = createValidateEmailLink(tokenFromParams)

  return (
    <main className="mx-4 -mt-12 flex max-w-[1000px] flex-col items-center rounded-xl border border-white bg-[#0C111C] p-8 text-white shadow-xl md:mx-auto  md:-mt-24 md:mb-10">
      {/* email and verified status */}
      <VerifiedStatus email={email} verified={verified as boolean} />

      {/* call to action */}
      <h1 className="my-4 text-2xl font-semibold tracking-tight md:mb-16 md:mt-10 md:text-7xl">
        Please Verify Your Email!
      </h1>
      <p className=" mb-10 text-center text-xs leading-6 md:mb-20 md:text-2xl md:leading-10">
        {` You'll receive an email shortly at `}
        <span className="font-bold text-teal-500 underline">{email}</span>.
        <br />
        Click the link in your email to verify your account.
      </p>

      <ResendConfirmationButton
        email={email}
        validateEmailLink={validateEmailLink}
      />
    </main>
  )
}
