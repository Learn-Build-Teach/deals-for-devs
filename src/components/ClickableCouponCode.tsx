'use client'

import { useState } from 'react'
import { FaCopy, FaTag } from 'react-icons/fa'

export default function ClickableCouponCode({ coupon }: { coupon: string }) {
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(coupon)
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="relative flex cursor-pointer items-center gap-x-1 font-bold text-teal-500"
    >
      <span>{coupon}</span>
      <FaCopy />
      {showPopup && (
        <span className="-top-15 absolute -right-20 -translate-y-full transform rounded-md border-2 border-gray-950 bg-gray-200 px-2 py-1 text-sm text-gray-800">
          Coupon copied
        </span>
      )}
    </button>
  )
}
