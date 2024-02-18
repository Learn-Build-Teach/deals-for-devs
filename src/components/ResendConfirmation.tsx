'use client'
import React from 'react'
import { sendConfirmationEmail } from '@/actions/sendConfirmationEmail'
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
        const data = await sendConfirmationEmail(email, confirmationLink)
        if (data.data) {
          toast.success('Confirmation Email Sent!')
        }

        if (data.error) {
          toast.error('Error Sending Confirmation Email: ' + data.error)
        }
      }}
    >
      Resend Email
    </button>
  )
}
