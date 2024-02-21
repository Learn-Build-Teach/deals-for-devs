'use client'
import React from 'react'
import { sendConfirmationEmail } from '@/utils/resend/email-sendConfirmation'
import toast from 'react-hot-toast'

interface ResendConfirmationProps {
  email: string
  confirmationLink: string
}

export default function ResendConfirmation({
  email,
  confirmationLink,
}: ResendConfirmationProps) {
  return (
    <button
      type="button"
      className="rounded-lg border border-white px-4 py-2 text-lg text-white hover:bg-white hover:text-black"
      onClick={async () => {
        const { error } = await sendConfirmationEmail(email, confirmationLink)

        if (error) {
          return toast.error('Error Sending Confirmation Email: ' + error)
        }

        toast.success('Confirmation Email Sent!')
      }}
    >
      Resend Email
    </button>
  )
}
