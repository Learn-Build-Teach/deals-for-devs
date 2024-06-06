'use client'

import { ReactNode } from 'react'
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
  return (
    <div
      className={`fixed inset-0  flex items-center justify-center p-10 ${
        isOpen ? 'block' : 'hidden'
      } z-50 bg-gray-950/[.80] `}
    >
      <div className="hide-scrollbar relative h-[90vh]  w-full max-w-4xl overflow-y-scroll rounded-xl  bg-gray-900 px-4 pt-16 shadow-lg md:px-8 md:pt-16">
        <button
          onClick={onClose}
          className="fixed right-3 top-3 text-gray-400 transition-colors hover:text-white focus:outline-none"
        >
          <FaTimes className="h-10" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Overlay
