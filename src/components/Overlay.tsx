'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { FaTimes } from 'react-icons/fa'
import { Button } from './ui/button'

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

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialogRef.current?.close()
      document.body.style.overflow = 'unset'
    }
  })
  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'hide-scrollbar fixed z-50 w-full max-w-4xl rounded-xl bg-gray-900 px-4 py-10 shadow-lg backdrop:bg-gray-950/[.80] md:px-8',
        className
      )}
      onClose={onClose}
    >
      <Button
        onClick={onClose}
        className="fixed right-2 top-2"
        aria-label="Close"
        variant="ghost-light"
      >
        <FaTimes className="h-10" />
      </Button>
      {children}
    </dialog>
  )
}

export default Overlay
