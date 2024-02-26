import React from 'react'
import {
  HiOutlineExclamationCircle as Warning,
  HiOutlineCheckCircle as Success,
} from 'react-icons/hi'
import { cn } from '@/lib/utils'

import { LuBadgeCheck } from 'react-icons/lu'

interface VerifiedStatusProps {
  email: string
  verified: boolean
}

export default function VerifiedStatus({
  email,
  verified,
}: VerifiedStatusProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm font-extralight font-light underline md:text-2xl">
        {email}
      </span>

      <div
        className={cn(
          'flex items-center gap-2 rounded-full px-1 py-1 pr-3 text-xs font-extralight  md:pl-2 md:pr-3 md:text-lg ',
          verified ?
            'bg-[#14B8A638]/[.22] hover:bg-[#14B8A638]/[.22]'
          : 'bg-[#F9D72238]/[.22] hover:bg-[#F9D72238]/[.22]'
        )}
      >
        {verified ?
          <LuBadgeCheck className="text-xl md:text-2xl" />
        : <Warning className="text-xl md:text-2xl" />}

        {verified ? 'Verified' : 'Unverified'}
      </div>
    </div>
  )
}
