import { Button } from '@/components/ui/button'
import React from 'react'
import { CiShare2 } from 'react-icons/ci'

export default function ShareDealButton() {
  return (
    <Button className="flex gap-x-2" variant="outline">
      <CiShare2 /> <span>Share</span>
    </Button>
  )
}
