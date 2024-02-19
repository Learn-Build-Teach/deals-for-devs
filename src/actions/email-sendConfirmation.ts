'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { confirmEmail } from '@/emails/emailConfirmation'
import { baseURL } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)
const environment = process.env.VERCEL_ENV

export const sendConfirmationEmail = async (email: string, link: string) => {
  let data

  // Set the from email address based on the environment
  const fromEmail =
    process.env.FROM_EMAIL || 'Deals for Devs<hello@chrisnowicki.io>'

  // Send the confirmation email
  try {
    data = await resend.emails.send({
      from: fromEmail,
      to: email,
      reply_to: 'support@dealsfordevs.com',
      subject: 'Confirm your email',
      react: React.createElement(confirmEmail, {
        email: email,
        link: link,
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
