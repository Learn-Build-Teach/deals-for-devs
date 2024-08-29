'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Loading from '../Loading'
import { Button } from '../ui/button'

interface DeleteDealButtonProps {
  text: string
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function SubmitButton({
  text,
  handleClick,
}: DeleteDealButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button variant="primary" type="submit" onClick={handleClick} size="lg">
      {pending ?
        <span className=" text-black">
          <Loading />
        </span>
      : text}
    </Button>
  )
}
