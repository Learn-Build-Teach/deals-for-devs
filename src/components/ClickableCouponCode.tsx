'use client'

import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'

export default function ClickableCoupon({ coupon }: { coupon: string }) {
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(coupon)
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 1000)
  }

  return (
    <span className="relative cursor-pointer" onClick={handleClick}>
      <span>{coupon}</span>
      <FaCopy className="inline h-3" />
      {showPopup && (
        <span className="-top-15 absolute -right-20 -translate-y-full transform rounded-md border-2 border-gray-950 bg-gray-200 px-2 py-1 text-sm text-gray-800">
          Coupon copied
        </span>
      )}
    </span>
  )
}
