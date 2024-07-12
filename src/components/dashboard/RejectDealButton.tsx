'use client'
import { rejectDealAction } from '@/app/admin/dashboard/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface RejectDealButtonProps {
  id: string
}
export default function RejectDealButton({ id }: RejectDealButtonProps) {
  const router = useRouter()

  const handleRejectClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { error, successMessage } = await rejectDealAction(id)

    if (error) {
      toast.error(error)
    } else {
      if (successMessage) {
        toast.success(successMessage)
      }
      router.push('/admin/dashboard')
    }
  }
  return (
    <button
      className="rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-red-50"
      onClick={handleRejectClick}
    >
      Reject Deal
    </button>
  )
}
