'use client'

import { deleteSubscriberAction } from '@/actions/dashboard/subscriber'
import toast from 'react-hot-toast'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      className="cursor text-red-600"
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
    </button>
  )
}
