import { DealsRecord } from '@/xata';
import Link from 'next/link';
import React from 'react';
import AdminOptions from './AdminOptions';

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
    <div className=" max-w-sm p-6 bg-gray-800 border border-gray-200 rounded-lg shadow">
      <Link
        href={deal.link}
        className=" text-2xl font-bold tracking-tight text-gray-200 hover:text-white"
      >
        <h2>{deal.name}</h2>
      </Link>
      {deal.startDate && deal.endDate && (
        <small>
          {startDateStr} - {endDateStr}
        </small>
      )}
      <p className="font-normal text-gray-300 line-clamp-4 mt-2">
        {deal.description}
      </p>
      {deal.coupon && (
        <p className="mt-4 text-sm font-medium text-gray-400">
          Coupon Code:{' '}
          <span className="font-bold text-gray-100">{deal.coupon}</span>
          {deal.couponPercent && <span>{`(${deal.couponPercent}% off)`}</span>}
        </p>
      )}
      {showAdminOptions && <AdminOptions id={deal.id} />}
    </div>
  );
}
