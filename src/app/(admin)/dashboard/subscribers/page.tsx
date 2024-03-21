import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isAdminUser } from '@/utils/auth'
import Dashboard from '@/components/dashboard/Dashboard'
import { getAllDeals, getAllSubscribers } from '@/lib/queries'
import SubscriberList from '@/components/subscriber/SubscriberList'

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
  const dealsData = getAllDeals()
  const subscribersData = getAllSubscribers()

  const [deals, subscribers] = await Promise.all([dealsData, subscribersData])

  const subscriberList = JSON.parse(JSON.stringify(subscribers))
  const dealsList = JSON.parse(JSON.stringify(deals))

  return (
    <main className="mx-auto space-y-12 px-4 pb-10">
      <h2 className="text-center text-5xl text-white">Manage Subscribers</h2>

      <section className="mx-auto grid gap-8 lg:grid-cols-3">
        <div className="mx-auto lg:col-span-1">
          <Dashboard />
        </div>
        <div className="mx-auto lg:col-span-2">
          <SubscriberList subscribers={subscriberList} />
        </div>
      </section>
    </main>
  )
}
