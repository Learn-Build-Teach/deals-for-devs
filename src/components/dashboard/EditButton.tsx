'use client'

import React from 'react'
import { Button } from '../ui/button'
import { FaEdit } from 'react-icons/fa'

export default function EditButton({ id }: { id: string }) {
  return (
    <Button
      asLink={true}
      href={`/dashboard/deals/${id}/edit`}
      variant="outline"
    >
      <FaEdit className="inline h-3" />
    </Button>
  )
}
