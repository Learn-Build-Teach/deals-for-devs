'use client'

import React from 'react'
import { Button } from '../ui/button'

export default function EditButton({ id }: { id: string }) {
  return (
    <Button
      asLink={true}
      href={`/dashboard/deals/${id}/edit`}
      variant="outline"
    >
      Edit
    </Button>
  )
}
