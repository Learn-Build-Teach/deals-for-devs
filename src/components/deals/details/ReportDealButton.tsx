'use client'
import React, { useState } from 'react'
import { CiFlag1 } from 'react-icons/ci'
import ReportDealPopup from './ReportDealPopup'
import { Button } from '@/components/ui/button'

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
      <Button
        className="flex items-center gap-x-2 underline"
        variant="link-destructive"
        onClick={handleClick}
      >
        <CiFlag1 /> <span>Report Deal</span>
      </Button>
      <ReportDealPopup
        isOpen={popupOpen}
        dealId={dealId}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}
