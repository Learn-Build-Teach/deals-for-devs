'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { confirmEmail } from '@/emails/emailConfirmation'

export const sendConfirmationEmail = async (email: string, link: string) => {
  let data

  const baseURL = process.env.BASE_URL
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Set the from email address based on the environment
  const from = process.env.FROM_EMAIL || 'Deals for Devs<hello@chrisnowicki.io>'

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
        'List-Unsubscribe': `<${baseURL}/unsubscribe>`,
      },
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
