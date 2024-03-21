import { z } from 'zod'

const envVariables = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  VERCEL_ENV: z.string().optional().default('development'),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  XATA_BRANCH: z.string(),
  XATA_API_KEY: z.string(),
  RESEND_API_KEY: z.string(),
  CRON_SECRET: z.string(),
  FROM_EMAIL: z.string().email(),
  REPLY_TO_EMAIL: z.string().email(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  NEXT_PUBLIC_ENVIRONMENT: z.string(),
})

const {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  VERCEL_ENV,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  NEXT_PUBLIC_SENTRY_DSN,
  XATA_BRANCH,
  XATA_API_KEY,
  RESEND_API_KEY,
  CRON_SECRET,
  FROM_EMAIL,
  REPLY_TO_EMAIL,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_ENVIRONMENT,
} = process.env

const envServerSchema = envVariables.safeParse({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  VERCEL_ENV,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  NEXT_PUBLIC_SENTRY_DSN,
  XATA_BRANCH,
  XATA_API_KEY,
  RESEND_API_KEY,
  CRON_SECRET,
  FROM_EMAIL,
  REPLY_TO_EMAIL,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_ENVIRONMENT,
})

if (!envServerSchema.success) {
  console.error(envServerSchema.error.issues)
  throw new Error('There is an error with the environment variables')
}

export const envVariablesData = envServerSchema.data

type EnvVarSchemaType = z.infer<typeof envVariables>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
