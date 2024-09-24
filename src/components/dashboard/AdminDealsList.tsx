import { Deal } from '@prisma/client'
import { format } from 'date-fns'
import Link from 'next/link'
import DealImage from '../deals/DealImage'
import { Category } from '@/types'

export default function AdminDealsList({ deals }: { deals: Deal[] }) {
  return (
    <div className="relative overflow-x-auto @container">
      <table className="w-full rounded-md text-left text-sm text-gray-400 ">
        <thead className=" bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 @[700px]:underline">
              Deal
            </th>
            <th
              scope="col"
              className="hidden w-20 px-6 py-3 @[700px]:table-cell"
            >
              Owner
            </th>
            <th scope="col" className="w-40 px-6 py-3">
              Created
            </th>
            <th scope="col" className="w-32 px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              className="border-b border-gray-700 bg-gray-800"
              key={deal.xata_id}
            >
              <td
                scope="row"
                className="flex items-center gap-x-4 whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                <div className="hidden w-32 @[700px]:block">
                  <DealImage
                    couponPercent={deal.couponPercent || undefined}
                    coverImageURL={deal.coverImageURL}
                    category={deal.category as Category}
                    name={deal.name}
                  />
                </div>
                <Link
                  className="transition-colors hover:text-teal-500"
                  href={`/dashboard/deals/${deal.xata_id}`}
                >
                  {deal.name}
                </Link>
              </td>
              <td className="hidden w-20 text-ellipsis whitespace-nowrap px-6 py-4 @[700px]:table-cell">
                {deal.contactName}
              </td>
              <td className="px-6 py-4">
                {format(new Date(deal.xata_createdat), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4">
                {deal.approved ? 'Approved' : 'Pending'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
