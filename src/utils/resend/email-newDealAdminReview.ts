'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { env } from '@/env'
import { emailAdminNewDeal } from '@/emails/emailAdminNewDeal'

type EmailOptions = {
    to: string
    reply_to: string
    subject: string
    from: string
    resendAPIKey: string
}

export const emailNewDealToAdmin = async(
  dealId: string,
  options: EmailOptions,   
) => {  
  let { to, reply_to, subject, from, resendAPIKey } = options 

  const resend = new Resend(resendAPIKey)

  from = `Deals for Devs<${env.FROM_EMAIL}>`
    
  const { data, error } = await resend.emails.send({    
      from,
      to,
      reply_to,
      subject,
      react: React.createElement(emailAdminNewDeal, {
        dealId,
        appDomain: env.NEXT_PUBLIC_BASE_URL        
      }
      ),
      headers: {
        Date: new Date().toUTCString(),
      },
      tags: [
        {
          name: 'category',
          value: 'admin_new_deal_email',
        },
      ],
    })
  return { data, error }
}