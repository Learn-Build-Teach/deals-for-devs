import React from 'react'
import DealGradientPlaceholder from './DealGradientPlaceholder'
import Image from 'next/image'
import { Category } from '@/types'

interface IDealImageProps {
  coverImageURL: string | null
  category: Category
  name: string
  couponPercent?: number
}
export default function DealImage({
  coverImageURL,
  category,
  name,
  couponPercent,
}: IDealImageProps) {
  return (
    <div className="relative @container">
      {couponPercent && (
        <p className="-gap-y-1 absolute right-3 top-3 hidden h-14 w-14 -rotate-12 flex-col items-center justify-center rounded-full bg-pale-gold text-black  shadow-md @[260px]:flex">
          <span className="text-md -mb-1 font-bold">{couponPercent}%</span>
          <span className="text-xs uppercase">off</span>
        </p>
      )}
      {!coverImageURL && <DealGradientPlaceholder category={category} />}
      {coverImageURL && (
        <Image
          src={coverImageURL}
          alt={name}
          width={1920}
          height={1080}
          className="aspect-video rounded-2xl border-4 border-slate-500 object-cover transition duration-300 ease-in-out  group-hover:border-teal-500"
        />
      )}
    </div>
  )
}
