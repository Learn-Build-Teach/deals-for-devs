import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/deals/(.*)',
    '/deals',
    '/monitoring',
    '/api/deals',
    '/.well-known/webfinger',
    '/confirm/(.*)',
    '/preferences/(.*)',
    '/api/cron/monthly-newsletter',
    '/api/validate',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
