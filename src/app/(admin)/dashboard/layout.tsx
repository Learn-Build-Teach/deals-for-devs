import { auth, currentUser } from '@clerk/nextjs/server'
import { isAdminUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/dashboard/AdminNav'

export default async function Home({
  children,
}: {
  children: React.ReactNode
}) {
  auth().protect()

  const user = await currentUser()

  const email = user?.emailAddresses[0].emailAddress
  if (!email) {
    return redirect('/')
  }
  const isAdmin = await isAdminUser(email)
  if (!isAdmin) {
    return redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="h-full min-h-screen w-72 px-6"></div>
      <AdminNav />
      <main className=" w-full px-4 py-20  md:px-16">{children}</main>
    </div>
  )
}
