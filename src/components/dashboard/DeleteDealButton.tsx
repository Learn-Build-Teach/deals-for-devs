'use client'
import { deleteDealAction } from '@/app/(admin)/dashboard/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { FaTrash } from 'react-icons/fa'

interface DeleteDealButtonProps {
  id: string
}
export default function DeleteDealButton({ id }: DeleteDealButtonProps) {
  const router = useRouter()

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm('Are you sure you want to delete deal?') == true) {
      return
    }
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
      <span className="sr-only">Delete</span>
      <FaTrash className="inline h-3" />
    </Button>
  )
}
