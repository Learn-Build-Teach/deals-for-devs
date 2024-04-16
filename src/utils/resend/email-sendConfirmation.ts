'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { confirmEmail } from '@/emails/emailConfirmation'
import { env } from '@/env'

export const sendConfirmationEmail = async (email: string, link: string) => {
  let data

  const resend = new Resend(env.RESEND_API_KEY)

  // Set the from email address based on the environment
  const from = `Deals for Devs<${env.FROM_EMAIL}>`
  const reply_to = env.REPLY_TO_EMAIL

  // Send the confirmation email
  try {
    data = await resend.emails.send({
      from,
      to: email,
      reply_to,
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
    console.info(data)
    console.info(`Email sent to ${email}`)
  } catch (error: unknown) {
    console.error(error)
    //TODO: handle specific errors
    return {
      error: 'Failed to send confirmation email',
    }
  }

  return {
    data,
  }
}
