import Link from 'next/link'
import { Category } from '@/types/Types'
import { Deal } from '@prisma/client'
import DealImage from './DealImage'

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/deals/${deal.xata_id}`}
      className="group relative w-full text-white hover:text-teal-500"
      rel="noopener noreferrer"
    >
      <DealImage
        name={deal.name}
        coverImageURL={deal.coverImageURL}
        category={deal.category as Category}
        couponPercent={deal.couponPercent || undefined}
      />
      <h2 className="mt-1 text-lg font-semibold tracking-tight">{deal.name}</h2>
    </Link>
  )
}
