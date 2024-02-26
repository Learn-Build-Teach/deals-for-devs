'use client'
import { sendConfirmationEmail } from '@/utils/resend/email-sendConfirmation'
import toast from 'react-hot-toast'

interface ResendConfirmationProps {
  email: string
  validateEmailLink: string
}

export default function ResendConfirmationButton({
  email,
  validateEmailLink,
}: ResendConfirmationProps) {
  return (
    <form
      action={async () => {
        const { error } = await sendConfirmationEmail(email, validateEmailLink)

        if (error) {
          return toast.error('Error Sending Confirmation Email: ' + error)
        }

        toast.success('Confirmation Email Sent!')
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-teal-500 px-3 py-2 text-xs  text-teal-500 hover:bg-teal-500 hover:text-white md:rounded-lg md:px-7 md:py-5 md:text-2xl"
      >
        Resend Email
      </button>
    </form>
  )
}
