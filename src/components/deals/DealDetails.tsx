import { Category, DealWithTags } from '@/types/Types'
import React from 'react'
import DealImage from './DealImage'
import TagsList from '../forms/add-a-deal/TagsList'
import ClickableCoupon from '../ClickableCouponCode'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface DealDetailsProps {
  deal: DealWithTags
}
export default function DealDetails({ deal }: DealDetailsProps) {
  return (
    <div className=" mx-auto max-w-[800px] text-white">
      <div className="mb-10">
        <p className="mb-2 font-bold  text-teal-500">{deal.category || ''}</p>
        <div className="mb-10 flex flex-row items-end justify-between gap-x-4">
          <h1 className="inline text-2xl transition-colors hover:text-teal-500 md:text-3xl">
            {deal.name}
          </h1>
          <Link
            href={deal.link}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-teal-500 px-2 py-1 text-black transition-all hover:scale-105 hover:bg-teal-500/90"
          >
            <span>Visit</span>
            <Image
              src="/icons/upright-arrow.svg"
              alt="arrow right"
              width={16}
              height={16}
            />
          </Link>
        </div>

        <div className="text-md mb-4 font-light md:text-lg">
          <div className="mb-1 flex flex-wrap gap-2">
            <span className="w-40 text-white/70 ">Valid from:</span>
            <span className="font-bold">
              {`${format(new Date(deal.startDate), 'MMM d, yyyy')} - ${deal.endDate ? format(new Date(deal.endDate), 'MMM d, yyyy') : '(no end date)'}` ||
                'No coupon code required'}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2 text-lg font-light md:mt-1.5">
            <span className="w-40 text-white/70">Coupon Code:</span>
            <span className="font-bold">
              {deal.coupon ?
                <ClickableCoupon coupon={deal.coupon} />
              : 'No coupon code required'}
            </span>
          </div>
          <TagsList tags={deal.tags} />
        </div>
      </div>
      <div className="relative mx-auto aspect-video w-full ">
        <DealImage
          name={deal.name}
          coverImageURL={deal.coverImageURL || null}
          category={deal.category as Category}
        />
      </div>

      <div className="text-md mt-5 flex w-full flex-col items-start md:mt-10 md:text-lg ">
        <span className="font-bold uppercase">Description</span>
        <p className="whitespace-pre-wrap font-light">{deal.description}</p>
      </div>
    </div>
  )
}