import { getViewsByDeal } from '@/queries/dealView'
import Link from 'next/link'
import React from 'react'

interface DealListByViewsProps {
  limit?: number
}
export default async function DealListByViews({ limit }: DealListByViewsProps) {
  const viewsByDeal = await getViewsByDeal(limit)
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full rounded-md text-left text-sm text-gray-400 ">
        <thead className=" bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="w-32 px-6 py-3">
              Views
            </th>
          </tr>
        </thead>
        <tbody>
          {viewsByDeal.map((deal) => (
            <tr
              className="border-b border-gray-700 bg-gray-800"
              key={deal.xata_id}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                <Link
                  className="transition-colors hover:text-teal-500"
                  href={`/deals/${deal.xata_id}`}
                >
                  {deal.name}
                </Link>
              </th>
              <td className="px-6 py-4">{deal._count.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
