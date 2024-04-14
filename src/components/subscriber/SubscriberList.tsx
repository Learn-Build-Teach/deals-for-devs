import DeleteButton from './DeleteButton'
import SubscribeForm from '@/components/forms/SubscribeForm'
import type { Subscriber } from '@/xata'

interface SubscribersProps {
  subscribers: Subscriber[]
}

export default function SubscriberList({ subscribers }: SubscribersProps) {
  return (
    <div className="mx-auto flex flex-col space-y-8 text-center text-white">
      <h3 className="text-md uppercase">Add a Subscriber</h3>
      <SubscribeForm />
      <h3 className="text-md pt-8 uppercase">Subscriber List</h3>
      <ul className="grid w-full gap-2">
        {subscribers.map((subscriber) => (
          <li
            key={subscriber.email + subscriber.id}
            className="flex w-full justify-between border border-gray-800 px-2 py-1 transition-all duration-300 ease-in-out hover:scale-105 hover:border-teal-500"
          >
            {subscriber.email}
            <DeleteButton id={subscriber.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
