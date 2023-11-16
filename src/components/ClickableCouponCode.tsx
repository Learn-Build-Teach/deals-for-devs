'use client';

import { useState } from 'react';

export default function ClickableCouponCode({ coupon }: { coupon: string }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(coupon);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    console.log('copied coupon code to clipboard');
  };

  return (
    <span onClick={handleClick} className="font-bold text-teal-500 relative">
      {coupon}
      {showPopup && (
        <span className="absolute bg-gray-200 text-gray-800 border-2 border-gray-950 text-sm px-2 py-1 rounded-md -top-15 -right-20 transform -translate-y-full">
          Coupon copied
        </span>
      )}
    </span>
  );
}
