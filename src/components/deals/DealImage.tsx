import { Category } from '@/types/Types'
import { Deal } from '@prisma/client'
import React from 'react'
import DealGradientPlaceholder from '../DealGradientPlaceholder'
import Image from 'next/image'

interface IDealImageProps {
  coverImageURL: string | null
  category: Category
  name: string
}
export default function DealImage({
  coverImageURL,
  category,
  name,
}: IDealImageProps) {
  return (
    <>
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
    </>
  )
}
