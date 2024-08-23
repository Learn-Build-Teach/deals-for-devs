import { auth } from '@clerk/nextjs'
import { isAdminUser } from '@/utils/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/dashboard/AdminNav'

export default async function Home({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth().protect()

  // If user is logged in check if user is an admin
  const isAdmin = await isAdminUser(userId)

  // If user is not an admin, redirects them to the homepage
  if (!isAdmin) {
    return redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="h-full w-52 md:w-80">
        <AdminNav />
      </div>
      <main className=" ml-52 px-4 py-20 md:ml-80 md:px-8">{children}</main>
    </div>
  )
}
