'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'

const Overlay = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

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
      className="hide-scrollbar fixed inset-0 h-[90vh]  w-full max-w-4xl rounded-xl  bg-gray-900 px-4 pt-16 shadow-lg backdrop:bg-gray-950/[.80] md:px-8 md:pt-16"
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
