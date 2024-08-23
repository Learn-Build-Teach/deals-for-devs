import { Subscriber } from '@prisma/client'
import DeleteButton from './DeleteButton'
import SubscribeForm from '@/components/forms/SubscribeForm'

interface SubscribersProps {
  subscribers: Subscriber[]
}

export default function SubscriberList({ subscribers }: SubscribersProps) {
  return (
    <ul className="grid w-full gap-y-4">
      {subscribers.map((subscriber) => (
        <li
          key={subscriber.email + subscriber.xata_id}
          className="flex items-center gap-x-4"
        >
          {subscriber.email}
          <DeleteButton id={subscriber.xata_id} />
        </li>
      ))}
    </ul>
  )
}
