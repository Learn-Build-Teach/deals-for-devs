import { format } from 'date-fns'
import React from 'react'
import DealGradientPlaceholder from './DealGradientPlaceholder'
import { Category } from '@/types/Types'
import Image from 'next/image'
import ClickableCouponCode from './ClickableCouponCode'
import DealImage from './deals/DealImage'

export default function DealPreview({
  url,
  couponCode,
  startDate,
  endDate,
  category,
  name,
  description,
  coverImageURL,
}: {
  url: string
  couponCode?: string | null
  couponPercent?: number | null
  startDate: Date
  endDate?: Date
  category: string
  name: string
  description: string
  coverImageURL?: string | null
}) {
  return (
    <div className="flex flex-col items-start gap-10 text-white xl:flex-row xl:items-center">
      <div className="align-center relative aspect-video w-full max-w-[600px] self-center">
        <DealImage
          name={name}
          coverImageURL={coverImageURL || null}
          category={category as Category}
        />
      </div>
      <div className="flex  flex-col gap-y-1">
        <span className="text-xl md:text-3xl">{name}</span>
        <div className="mt-2 flex flex-wrap gap-2 text-sm md:mt-4 md:text-lg">
          <span className="font-light text-white/70">Website:</span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-normal underline hover:text-teal-500"
          >
            {url}
          </a>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className="text-white/70">Coupon Code:</span>
          <span className="">
            {couponCode ?
              <ClickableCouponCode coupon={couponCode} />
            : 'No coupon code required'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className=" text-white/70 ">Valid from:</span>
          <span className="font-normal">
            {`${format(new Date(startDate), 'MMM d')} - ${endDate ? format(new Date(endDate), 'MMM d, yyyy') : '(no end date)'}` ||
              'No coupon code required'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-light md:mt-1.5 md:text-lg">
          <span className=" text-white/70">Category:</span>
          <span className="font-normal">
            {category || 'No coupon code required'}
          </span>
        </div>
        <div className="mt-5 flex w-full flex-col items-start text-sm md:mt-10 md:text-lg ">
          <span className="font-bold uppercase">DESCRIPTION</span>
          <p className="whitespace-pre-wrap font-light">{description}</p>
        </div>
      </div>
    </div>
  )
}
