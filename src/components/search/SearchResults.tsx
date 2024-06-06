import { Deal } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import ClickableCouponCode from '../ClickableCouponCode'

export default function SearchResults({
  loading,
  deals,
  searchQuery,
}: {
  loading: boolean
  deals: Deal[] | null
  searchQuery: string
}) {
  return (
    <div className="flex-grow py-10">
      {loading && (
        <div className="flex animate-pulse flex-col gap-y-2">
          <div className="div h-6 w-32  rounded-lg bg-gray-800/[0.5]"></div>
          <div className="div h-24 rounded-lg bg-gray-800/[0.5]"></div>
          <div className="div h-24 rounded-lg bg-gray-800/[0.5]"></div>
        </div>
      )}

      {!loading && !deals && (
        <div className="text-center text-gray-100">
          <p className="mt-8 text-center text-xl font-bold ">
            No results to show
          </p>
          <p>Start typing in the search bar to see results</p>
        </div>
      )}

      {!loading && deals && deals.length === 0 && (
        <div className="text-center text-gray-100">
          <p className="mt-8 pb-1 text-center text-xl font-bold ">
            No results for search{' '}
            <span className="font-normal">{'"' + searchQuery + '"'}</span>
          </p>
          <p>Please try a different query</p>
        </div>
      )}

      {!loading && deals && deals.length > 0 && (
        <div className="hide-scrollbar overflow-y-scroll px-1">
          <p className="pb-4 text-gray-400">{deals.length} results found</p>
          <div className="flex max-h-[100%] grow flex-col items-stretch gap-y-4  ">
            {[...deals, ...deals, ...deals].map((deal) => (
              <Link
                key={deal.id}
                href={deal.link}
                className=" relative block cursor-pointer rounded-lg bg-gray-800 px-4 py-8 shadow transition duration-300 ease-in-out  hover:outline hover:outline-teal-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-bold tracking-tight text-gray-200">
                  {deal.name}
                </h2>
                <p className="text-md mt-2 line-clamp-4 font-normal text-gray-300">
                  {deal.description}
                </p>
                {deal.coupon && (
                  <p className="mt-2 flex gap-x-2 text-sm font-medium text-gray-400">
                    <span>Coupon Code: </span>
                    <ClickableCouponCode coupon={deal.coupon} />
                    {deal.couponPercent && (
                      <span>{`(${deal.couponPercent}% off)`}</span>
                    )}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
