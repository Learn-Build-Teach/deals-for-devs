import DeleteButton from './DeleteButton'
import SubscribeForm from '@/components/forms/SubscribeForm'
import type { Subscribers } from '@/xata'

interface SubscribersProps {
  subscribers: Subscribers[]
}

export default function SubscriberList({ subscribers }: SubscribersProps) {
  return (
    <div className="flex w-full flex-col items-center justify-start text-white">
      <h2 className="text-md mb-4 uppercase">Add a Subscriber</h2>
      <SubscribeForm />
      <div className='border w-1/3 border-teal-500 my-10'></div>
      <h2 className="text-md mb-4 uppercase">Subscriber List</h2>
      <ul>
        {subscribers.map((subscriber) => (
          <li
            key={subscriber.email + subscriber.id}
            className="flex w-[400px] justify-between text-white"
          >
            {subscriber.email}
            <DeleteButton id={subscriber.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
