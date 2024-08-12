'use client'
import { approveDealAction } from '@/app/admin/dashboard/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface RejectDealButtonProps {
  id: string
}
export default function ApproveDealButton({ id }: RejectDealButtonProps) {
  const router = useRouter()

  const handleApproveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { error, successMessage } = await approveDealAction(id)

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
      className="rounded-md border border-teal-500 px-4 py-2 text-teal-500 hover:bg-teal-500 hover:text-teal-50"
      onClick={handleApproveClick}
    >
      Approve
    </button>
  )
}
