'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { FaTimes } from 'react-icons/fa'

const Overlay = ({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useHotkeys('esc', onClose)

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  })
  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'hide-scrollbar fixed z-50 w-full max-w-4xl rounded-xl bg-gray-900 px-4 py-10 shadow-lg backdrop:bg-gray-950/[.80] md:px-8',
        className
      )}
    >
      <button
        onClick={onClose}
        className="fixed right-3 top-3 text-gray-400 transition-colors hover:text-white"
        aria-label="Close"
      >
        <FaTimes className="h-10" />
      </button>
      {children}
    </dialog>
  )
}

export default Overlay
