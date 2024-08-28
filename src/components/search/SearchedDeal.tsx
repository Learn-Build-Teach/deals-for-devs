import { Category } from '@/types/Types'
import { Deal } from '@prisma/client'
import DealGradientPlaceholder from '../deals/DealGradientPlaceholder'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DealImage from '../deals/DealImage'

interface ISearchedDealProps {
  deal: Deal
}

export default function SearchedDeal({ deal }: ISearchedDealProps) {
  return (
    <Link
      key={deal.xata_id}
      href={`/deals/${deal.xata_id}`}
      className="group relative grid cursor-pointer grid-cols-1 gap-y-4 border-b-2 border-b-gray-700 pb-8 pt-4 shadow transition duration-300 ease-in-out  md:grid-cols-5 md:place-items-center md:gap-x-6 md:gap-y-0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full">
        <DealImage
          name={deal.name}
          coverImageURL={deal.coverImageURL}
          category={deal.category as Category}
          couponPercent={deal.couponPercent || undefined}
        />
      </div>
      <div className="SearchedDealTextContainer col-span-4 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-200 transition-colors group-hover:text-teal-500 group-hover:underline">
          {deal.name}
        </h2>
        <p className="text-md line-clamp-4 font-normal text-gray-300">
          {deal.description}
        </p>
      </div>
    </Link>
  )
}
