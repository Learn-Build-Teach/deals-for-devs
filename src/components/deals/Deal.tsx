'use client'
import Link from 'next/link'
import React from 'react'
import AdminOptions from '../AdminOptions'
import ClickableCouponCode from '../ClickableCouponCode'
import { FaBeer, FaVideo, FaBook, FaCog, FaCalendar } from 'react-icons/fa'
import { Category } from '@/types/Types'
import { format } from 'date-fns'
import { Deal } from '@prisma/client'

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
      className="relative max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-gray-800 px-4 py-8 shadow transition duration-300 ease-in-out hover:rotate-1 hover:scale-105 hover:border-4 hover:border-teal-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-200">
        {deal.name}
      </h2>
      {deal.category && (
        <div className="absolute right-2 top-2 text-teal-500">
          {categoryToIcon[deal.category] as unknown as Category}
        </div>
      )}
      {deal.startDate && (
        <small className="text-gray-300">
          {startDate} - {endDate || '??'}
        </small>
      )}
      <p className="text-md mt-2 line-clamp-4 font-normal text-gray-300">
        {deal.description}
      </p>
      {deal.coupon && (
        <p className="mt-4 text-sm font-medium text-gray-400">
          Coupon Code: <ClickableCouponCode coupon={deal.coupon} />
          {deal.couponPercent && <span>{`(${deal.couponPercent}% off)`}</span>}
        </p>
      )}
      {showAdminOptions && <AdminOptions id={deal.id} />}
    </Link>
  )
}
