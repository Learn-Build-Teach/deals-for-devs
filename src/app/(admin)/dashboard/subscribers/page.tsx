import { getAllSubscribers } from '@/lib/queries'
import SubscriberList from '@/components/subscriber/SubscriberList'
import NewSubscriberForm from '@/components/dashboard/subscribers/NewSubscriberForm'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function Subscribers() {
  // fetch all subscribers
  const subscribersData = getAllSubscribers()
  const [subscribers] = await Promise.all([subscribersData])
  const subscriberList = JSON.parse(JSON.stringify(subscribers))

  return (
    <DashboardPage heading="Manage Subscribers">
      <div className="mb-10">
        <h3 className="mb-10 pt-8 text-center text-lg uppercase">
          Add Subscriber
        </h3>
        <NewSubscriberForm />
      </div>
      <div className="mb-10">
        <h3 className="mb-10 pt-8 text-center text-lg uppercase">
          Subscribers
        </h3>
        <SubscriberList subscribers={subscriberList} />
      </div>
    </DashboardPage>
  )
}
