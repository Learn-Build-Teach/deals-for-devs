'use client'
import { deleteDealAction } from '@/app/(admin)/dashboard/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

interface DeleteDealButtonProps {
  id: string
}
export default function DeleteDealButton({ id }: DeleteDealButtonProps) {
  const router = useRouter()

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { error, successMessage } = await deleteDealAction(id)

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
    <Button variant="outline-destructive" onClick={handleDeleteClick}>
      Delete
    </Button>
  )
}
