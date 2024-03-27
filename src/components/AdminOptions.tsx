'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AdminOptions({ id }: { id: string }) {
  const router = useRouter()
  //button click event handler typescript

  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    console.log(id)
    await fetch('/api/deals/approve', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.refresh()
  }

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const res = await fetch('/api/deals/reject', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.refresh()
  }

  return (
    <div className="mt-4 flex gap-x-4">
      <button
        onClick={handleApprove}
        className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
      >
        Approve
      </button>
      <button
        onClick={handleReject}
        className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
      >
        Reject
      </button>
    </div>
  )
}
