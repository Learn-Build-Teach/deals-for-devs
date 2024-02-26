'use client'
import React from 'react'
import { sendConfirmationEmail } from '@/utils/resend/email-sendConfirmation'
import toast from 'react-hot-toast'

interface ResendConfirmationProps {
  email: string
  validateEmailLink: string
}

export default function ResendConfirmation({
  email,
  validateEmailLink,
}: ResendConfirmationProps) {
  return (
    <form
      action={async () => {
        const { data, error } = await sendConfirmationEmail(
          email,
          validateEmailLink
        )

        if (error) {
          return toast.error('Error Sending Confirmation Email: ' + error)
        }
        toast.success('Confirmation Email Sent!')
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-white px-4 py-2 text-lg text-white hover:bg-white hover:text-black"
      >
        Resend Email
      </button>
    </form>
  )
}
