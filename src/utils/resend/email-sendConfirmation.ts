'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { confirmEmail } from '@/emails/emailConfirmation'

export const sendConfirmationEmail = async (email: string, link: string) => {
  let data

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Set the from email address based on the environment
  const from = process.env.FROM_EMAIL || ''

  // Send the confirmation email
  try {
    data = await resend.emails.send({
      from,
      to: email,
      reply_to: 'support@dealsfordevs.com',
      subject: 'Confirm your email',
      react: React.createElement(confirmEmail, {
        email,
        link,
      }),
      headers: {
        // this is important for if the subscriber has to resend the confirmation email.
        // the date header ensures there is a change in the email and it is not marked as spam.
        Date: new Date().toUTCString(),
      },
      tags: [
        {
          name: 'category',
          value: 'confirm_email',
        },
      ],
    })
  } catch (error: unknown) {
    return {
      error: error,
    }
  }

  return {
    data,
  }
}
