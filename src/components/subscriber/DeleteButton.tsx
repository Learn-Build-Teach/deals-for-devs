'use client'

import { deleteSubscriberAction } from '@/actions/dashboard/subscriber'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant="outline-destructive"
      type="button"
      onClick={async () => {
        if (
          !confirm('Are you sure you want to delete this subscriber?') == true
        ) {
          return
        }
        const res = await deleteSubscriberAction(id)
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
