import ResendConfirmationButton from '@/components/subscriber/ResendConfirmationButton'
import { Badge } from '@/components/ui/badge'
import { createValidateEmailLink } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { HiOutlineExclamationCircle as Warning } from 'react-icons/hi'
import { createPreferencesLink } from '@/lib/utils'
import { getOneSubscriber } from '@/lib/queries'

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

  const subscriber = await getOneSubscriber(tokenFromParams)

  if (!subscriber || !subscriber.email) {
    redirect('/')
  }

  const { email, verified, token } = subscriber

  if (verified) {
    const preferencesLink = createPreferencesLink(token as string)
    redirect(preferencesLink)
  }

  const validateEmailLink = createValidateEmailLink(token as string)

  return (
    <main className="mx-4 -mt-12 flex max-w-[1000px] flex-col items-center rounded-xl border border-white bg-[#0C111C] p-8 text-white shadow-xl  md:mx-auto md:-mt-24">
      {/* email and verified status */}
      <div className="flex  items-center justify-center gap-2 md:flex-row">
        <span className="text-xs font-extralight underline md:text-2xl">
          {email}
        </span>
        <Badge className="flex items-center gap-1 rounded-full bg-[#F9D72238]/[.22] pl-1 text-sm font-extralight md:text-xl">
          <Warning className="text-md md:text-2xl" />
          Unverified
        </Badge>
      </div>

      {/* call to action */}
      <span className="my-4 text-2xl font-semibold tracking-tight md:mb-16 md:mt-10 md:text-7xl">
        Please Verify Your Email!
      </span>
      <p className="md:leading-10h mb-10 text-center text-xs leading-6 md:mb-20 md:text-2xl md:leading-10">
        {` we've sent an email to `}
        <span className="font-bold text-teal-500 underline">{email}</span>.
        <br />
        Click the link in your email to verify your account.
      </p>

      {/* resend confirmation email */}
      <ResendConfirmationButton
        email={email}
        validateEmailLink={validateEmailLink}
      />
    </main>
  )
}
