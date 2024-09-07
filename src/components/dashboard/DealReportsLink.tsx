import React from 'react'
import { Button } from '../ui/button'

interface DealReportsLinkProps {
  id: string
}
export default function DealReportsLink({ id }: DealReportsLinkProps) {
  return (
    <Button
      href={`/dashboard/deals/${id}/reports`}
      asLink={true}
      variant="outline"
    >
      Reports
    </Button>
  )
}
