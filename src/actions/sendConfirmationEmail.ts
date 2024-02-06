'use server'
import * as React from 'react'
import { Resend } from 'resend'
import EmailConfirmationTemplate from '@/emails/emailConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendConfirmationEmail = async (email: string, link: string) => {
	let data

	try {
		data = await resend.emails.send({
			from: 'Deals for Devs<dealsfordevs@chrisnowicki.io>',
			to: email,
			subject: 'Please confirm your email for Deals for Devs Subscription',
			react: React.createElement(EmailConfirmationTemplate, {
				email: email,
				link: link,
			}),
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
