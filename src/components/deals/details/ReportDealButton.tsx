'use client'
import React, { useState } from 'react'
import { CiFlag1 } from 'react-icons/ci'
import ReportDealPopup from './ReportDealPopup'

interface ReportDealButtonProps {
  dealId: string
}

export default function ReportDealButton({ dealId }: ReportDealButtonProps) {
  const [popupOpen, setPopupOpen] = useState<boolean>(false)

  const handleClick = async () => {
    setPopupOpen(true)
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-x-2 rounded-md border-2 border-red-50 bg-red-50 px-4 py-2 text-center text-red-700 transition-colors hover:border-red-700 "
      >
        <CiFlag1 /> <span>Report Deal</span>
      </button>
      <ReportDealPopup
        isOpen={popupOpen}
        dealId={dealId}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}
