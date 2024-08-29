'use client'

import { deleteSubscriberAction } from '@/actions/dashboard/subscriber'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <Button
      variant={'outline-destructive'}
      size={'sm'}
      type="button"
      onClick={async () => {
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
