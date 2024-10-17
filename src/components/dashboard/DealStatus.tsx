import React from 'react'
import { Badge } from '../ui/badge'

export default function DealStatus({ approved }: { approved: boolean }) {
  const text = approved ? 'Approved' : 'Pending'
  const variant = approved ? 'success' : 'warning'
  return <Badge variant={variant}>{text}</Badge>
}
