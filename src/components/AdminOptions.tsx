'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminOptions({ id }: { id: string }) {
  const router = useRouter();
  //button click event handler typescript

  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const res = await fetch('/api/deals/approve', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.refresh();
  };

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const res = await fetch('/api/deals/reject', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.refresh();
  };

  return (
    <div className="flex gap-x-4 mt-4">
      <button
        onClick={handleApprove}
        className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded"
      >
        Approve
      </button>
      <button
        onClick={handleReject}
        className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
      >
        Reject
      </button>
    </div>
  );
}
