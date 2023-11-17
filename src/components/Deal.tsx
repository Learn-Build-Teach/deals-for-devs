import { DealsRecord } from '@/xata';
import Link from 'next/link';
import React from 'react';
import AdminOptions from './AdminOptions';
import ClickableCouponCode from './ClickableCouponCode';
import { FaBeer, FaVideo, FaBook, FaCog, FaCalendar } from 'react-icons/fa';
import { DealType } from '@/app/deals/add/DealForm';
const typeToIcon = {
  general: <FaBeer className="text-white" />,
  ebook: <FaBook className="text-white" />,
  'video-course': <FaVideo className="text-white" />,
  tool: <FaCog className="text-white" />,
  conference: <FaCalendar className="text-white" />,
};

export default function Deal({
  deal,
  showAdminOptions = false,
}: {
  deal: DealsRecord;
  showAdminOptions?: boolean;
}) {
  const startDateStr = deal.startDate?.toLocaleDateString('en-us', {
    // year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const endDateStr = deal.endDate?.toLocaleDateString('en-us', {
    // year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <Link
      href={deal.link}
      className=" max-w-sm py-8 px-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:scale-105 hover:border-teal-500 hover:border-4 hover:rotate-3 cursor-pointer transition duration-300 ease-in-out relative"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-200">
        {deal.name}
      </h2>
      {deal.type && (
        <div className="absolute top-2 right-2">
          {typeToIcon[deal.type as DealType]}
        </div>
      )}
      {deal.startDate && deal.endDate && (
        <small className="text-gray-300">
          {startDateStr} - {endDateStr}
        </small>
      )}
      <p className="font-normal text-md text-gray-300 line-clamp-4 mt-2">
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
  );
}
