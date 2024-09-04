import SubscriberList from '@/components/subscriber/SubscriberList'
import NewSubscriberForm from '@/components/dashboard/subscribers/NewSubscriberForm'
import DashboardPage from '@/components/dashboard/DashboardPage'

export default async function Subscribers() {
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
        <SubscriberList />
      </div>
    </DashboardPage>
  )
}
