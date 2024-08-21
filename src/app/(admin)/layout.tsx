import { ClerkProvider } from '@clerk/nextjs'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClerkProvider>{children}</ClerkProvider>
}
