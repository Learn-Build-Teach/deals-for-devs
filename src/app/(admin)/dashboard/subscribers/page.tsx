import { getAllSubscribers } from '@/lib/queries'
import SubscriberList from '@/components/subscriber/SubscriberList'

export default async function Subscribers() {
  // fetch all subscribers
  const subscribersData = getAllSubscribers()
  const [subscribers] = await Promise.all([subscribersData])
  const subscriberList = JSON.parse(JSON.stringify(subscribers))

  return (
    <section className="mx-auto space-y-12 px-4 pb-10">
      <h2 className="text-center text-5xl text-white">Manage Subscribers</h2>
      <div className="mx-auto lg:col-span-2">
        <SubscriberList subscribers={subscriberList} />
      </div>
    </section>
  )
}
