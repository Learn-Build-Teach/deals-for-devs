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
      <span className="text-sm font-light underline md:text-2xl">{email}</span>
      <div
        className={cn(
          'flex items-center gap-2 rounded-full py-1 pl-2 pr-3 text-xs',
          verified ? 'bg-[#14B8A638]/[.22]' : 'bg-[#F9D72238]/[.22]'
        )}
      >
        {verified ?
          <LuBadgeCheck className="text-sm md:text-2xl" />
        : <Warning className="text-2xl" />}

        {verified ? 'Verified' : 'Unverified'}
      </div>
    </div>
  )
}
