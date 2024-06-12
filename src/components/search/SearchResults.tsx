import { Deal } from '@prisma/client'
import React from 'react'
import SearchedDeal from './SearchedDeal'

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
        <div className=" px-1">
          <p className="pb-4 text-gray-400">{deals.length} results found</p>
          <div className="flex max-h-[100%] grow flex-col items-stretch gap-y-4  ">
            {deals.map((deal) => (
              <SearchedDeal key={deal.xata_id} deal={deal} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
