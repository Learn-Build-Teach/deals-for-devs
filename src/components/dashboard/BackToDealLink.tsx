import React from 'react'
import { Button } from '../ui/button'

export interface BackToDealLinkProps {
  id: string
}

export default function BackToDealLink({ id }: BackToDealLinkProps) {
  return (
    <Button
      href={`/dashboard/deals/${id}`}
      asLink={true}
      variant="link"
      className="px-0"
      size="lg"
    >
      Back to deal
    </Button>
  )
}
