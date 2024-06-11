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
    <main className="mx-auto space-y-12 px-4 pb-10">
      <section className="mx-auto grid gap-8 space-y-12 px-4  pb-10 lg:grid-cols-3 lg:space-y-0">
        <div className="mx-auto lg:col-span-1">
          <AdminNav />
        </div>
        <div className="mx-auto lg:col-span-2">{children}</div>
      </section>
    </main>
  )
}
