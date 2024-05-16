import Link from 'next/link'
import AdminOptions from '../AdminOptions'
import ClickableCouponCode from '../ClickableCouponCode'
import { FaBeer, FaVideo, FaBook, FaCog, FaCalendar } from 'react-icons/fa'
import { Category } from '@/types/Types'
import { format } from 'date-fns'
import { Deal } from '@prisma/client'
import Image from 'next/image'
import DealGradientPlaceholder from '../DealGradientPlaceholder'

const categoryToIcon: { [key: string]: JSX.Element } = {
  Misc: <FaBeer />,
  Ebook: <FaBook />,
  Video: <FaVideo />,
  Tool: <FaCog />,
  Conference: <FaCalendar />,
}

export default function DealCard({
  deal,
  showAdminOptions = false,
}: {
  deal: Deal
  showAdminOptions?: boolean
}) {
  if (!deal || !deal.startDate) {
    return null
  }

  const startDate = format(new Date(deal.startDate), 'MMM d, yyyy')
  let endDate

  if (deal.endDate) {
    endDate = format(new Date(deal.endDate), 'MMM d, yyyy')
  }

  return (
    <Link
      href={deal.link}
      className="group relative w-full text-white hover:text-teal-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      {!deal.coverImageURL && (
        <DealGradientPlaceholder category={deal.category as Category} />
      )}
      {deal.coverImageURL && (
        <Image
          src={deal.coverImageURL}
          alt={deal.name}
          width={480}
          height={270}
          className="aspect-video rounded-2xl transition duration-300 ease-in-out group-hover:outline group-hover:outline-teal-500"
        />
      )}
      <h2 className="text-lg font-semibold tracking-tight">{deal.name}</h2>
      {deal.coupon && deal.couponPercent && (
        <p className="-gap-y-1 bg-pale-gold absolute right-3 top-3 flex h-14 w-14 -rotate-12 flex-col items-center justify-center rounded-full  text-black shadow-md">
          <span className="text-md -mb-1 font-bold">{deal.couponPercent}%</span>
          <span className="text-xs uppercase">off</span>
        </p>
      )}
      {showAdminOptions && <AdminOptions id={deal.id} />}
    </Link>
  )
}

{
  /* Coupon Code: <ClickableCouponCode coupon={deal.coupon} /> */
}
