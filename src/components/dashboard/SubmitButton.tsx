'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Loading from '../Loading'

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
    <button
      className="mt-2 rounded-lg bg-teal-500 px-10 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
      type="submit"
      onClick={handleClick}
    >
      {pending ?
        <span className=" text-black">
          <Loading />
        </span>
      : text}
    </button>
  )
}
