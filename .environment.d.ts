declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: String;
      CLERK_SECRET_KEY: String;
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: String;
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: String;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: String;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: String;
      XATA_BRANCH: String;
      XATA_API_KEY: String;
      NEXT_PUBLIC_POSTHOG_KEY: String;
      NEXT_PUBLIC_POSTHOG_HOST: String;
      NEXT_PUBLIC_SENTRY_DSN: String;
    }
  }
}
