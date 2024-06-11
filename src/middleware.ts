import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: (req) => !req.url.includes('/admin/dashboard'),
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(trpc)(.*)'],
}
