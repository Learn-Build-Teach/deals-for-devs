'use client'

import { deleteAdminUserAction } from '@/actions/dashboard/adminUser'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant="outline-destructive"
      size="sm"
      onClick={async () => {
        const res = await deleteAdminUserAction(id)
        if (res.message) {
          if (!res.success) {
            toast.error(res.message)
          } else {
            toast.success(res.message)
          }
        }
      }}
    >
      X
    </Button>
  )
}
