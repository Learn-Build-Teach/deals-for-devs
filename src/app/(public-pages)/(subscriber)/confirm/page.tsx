import ResendConfirmationButton from '@/components/subscriber/ResendConfirmationButton'
import { createValidateEmailLink } from '@/lib/utils'
import { redirect } from 'next/navigation'
import VerifiedStatus from '@/components/subscriber/VerifiedStatus'
import Link from 'next/link'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { getOneSubscriberByToken } from '@/queries/subscribers'

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

  const validateEmailLink = createValidateEmailLink(tokenFromParams)

  return (
    <Container>
      <main className=" flex flex-col items-center rounded-xl border border-white bg-gray-800 p-8 text-white shadow-xl">
        {/* email and verified status */}
        <VerifiedStatus email={email} verified={verified as boolean} />

        {/* not verified */}
        {!verified && (
          <>
            {/* call to action */}
            <h1 className="my-4 text-center text-2xl font-semibold tracking-tight md:mb-16 md:mt-10 md:text-6xl">
              Please Verify Your Email!
            </h1>
            <p className=" mb-10 text-center text-xs leading-6 md:mb-20 md:text-2xl md:leading-10">
              {` You'll receive an email shortly at `}
              <span className="font-bold text-teal-500 underline">{email}</span>
              .
              <br />
              Click the link in your email to verify your account.
            </p>

            <ResendConfirmationButton
              email={email}
              validateEmailLink={validateEmailLink}
            />
          </>
        )}

        {/* verified */}
        {verified && (
          <>
            <h1 className="my-4 text-2xl font-semibold tracking-tight md:mb-16 md:mt-10 md:text-6xl">
              Your email is verified, Thanks!
            </h1>

            <Link
              href="/deals"
              className="mt-2 rounded-lg bg-teal-600 p-4 py-4 text-xl hover:bg-teal-600/40 lg:text-4xl"
            >
              Start Shopping Deals!
            </Link>
          </>
        )}
      </main>
    </Container>
  )
}
