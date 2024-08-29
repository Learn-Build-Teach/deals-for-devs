'use client'
import { sendConfirmationEmail } from '@/utils/resend/email-sendConfirmation'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

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
      <Button variant="primary" type="submit" size="lg">
        Resend Email
      </Button>
    </form>
  )
}
