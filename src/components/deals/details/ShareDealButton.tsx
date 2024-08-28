import React from 'react'
import { CiShare2 } from 'react-icons/ci'

export default function ShareDealButton() {
  return (
    <button className="flex items-center justify-center gap-x-2 rounded-md border-2 border-gray-100 bg-gray-100 px-4 py-2 transition-colors hover:border-gray-300   ">
      <CiShare2 /> <span>Share Deal</span>
    </button>
  )
}
