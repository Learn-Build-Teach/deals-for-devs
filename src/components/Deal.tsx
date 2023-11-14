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
  return (
    <div className=" max-w-sm p-6 bg-gray-800 border border-gray-200 rounded-lg shadow">
      <Link
        href={deal.link}
        className="mb-2 text-2xl font-bold tracking-tight text-gray-200 hover:text-white"
      >
        <h2>{deal.name}</h2>
      </Link>
      <p className="font-normal text-gray-300">{deal.description}</p>
      {deal.coupon && (
        <p className="mt-4 text-sm font-medium text-gray-400">
          Coupon Code: ({deal.couponPercent}%off) {deal.coupon}
        </p>
      )}
      {showAdminOptions && <AdminOptions id={deal.id} />}
    </div>
  );
}
