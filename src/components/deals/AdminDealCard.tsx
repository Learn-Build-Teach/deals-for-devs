import Link from 'next/link'
import AdminOptions from '../AdminOptions'
import { FaBeer, FaVideo, FaBook, FaCog, FaCalendar } from 'react-icons/fa'
import { Category } from '@/types/Types'
import { Deal } from '@prisma/client'
import DealImage from './DealImage'

const categoryToIcon: { [key: string]: JSX.Element } = {
  Misc: <FaBeer />,
  Ebook: <FaBook />,
  Video: <FaVideo />,
  Tool: <FaCog />,
  Conference: <FaCalendar />,
}

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <div
      className="group relative w-full text-white hover:text-teal-500"
      rel="noopener noreferrer"
    >
      <DealImage
        name={deal.name}
        coverImageURL={deal.coverImageURL}
        category={deal.category as Category}
      />
      <h2 className="text-lg font-semibold tracking-tight">{deal.name}</h2>
      {deal.coupon && deal.couponPercent && (
        <p className="-gap-y-1 absolute right-3 top-3 flex h-14 w-14 -rotate-12 flex-col items-center justify-center rounded-full bg-pale-gold  text-black shadow-md">
          <span className="text-md -mb-1 font-bold">{deal.couponPercent}%</span>
          <span className="text-xs uppercase">off</span>
        </p>
      )}
      <AdminOptions id={deal.xata_id} />
    </div>
  )
}
