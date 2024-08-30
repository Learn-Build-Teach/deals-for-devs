'use client'
import { approveDealAction } from '@/app/(admin)/dashboard/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

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
      router.push('/dashboard')
    }
  }
  return (
    <Button onClick={handleApproveClick} variant="outline-success">
      Approve
    </Button>
  )
}
