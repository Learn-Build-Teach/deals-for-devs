import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isAdminUser } from '@/utils/auth'
import Dashboard from '@/components/dashboard/Dashboard'
import {
  getAllDeals,
  getAllSubscribers,
  getAllUnapprovedDeals,
} from '@/lib/queries'

export default async function Home() {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  // If user is logged in check if user is an admin
  const isAdmin = await isAdminUser(userId)

  if (!isAdmin) {
    return redirect('/')
  }

  // fetch all deals and subscribers
  const dealsPromise = getAllUnapprovedDeals()
  const subscribersPromise = getAllSubscribers()

  const [deals, subscribers] = await Promise.all([
    dealsPromise,
    subscribersPromise,
  ])

  return (
    <main className="mb-10">
      <Dashboard deals={deals} subscribers={subscribers} />
    </main>
  )
}
