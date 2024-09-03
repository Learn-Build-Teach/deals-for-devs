import DeleteButton from './DeleteButton'
import { getSubscribers } from '@/queries/subscribers'
interface SubscribersProps {
  limit?: number
}

export default async function SubscriberList({ limit }: SubscribersProps) {
  const subscribers = await getSubscribers(limit)

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full rounded-md text-left text-sm text-gray-400 ">
        <thead className=" bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="w-32 px-6 py-3">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr
              className="border-b border-gray-700 bg-gray-800"
              key={subscriber.xata_id}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                {subscriber.email}
              </th>
              <td className="px-6 py-4">
                <DeleteButton id={subscriber.xata_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
