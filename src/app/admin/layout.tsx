import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClerkProvider>{children}</ClerkProvider>
}
