'use client'

import { deleteAdminUserAction } from '@/actions/dashboard/adminUser'
import toast from 'react-hot-toast'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      className="cursor text-red-600"
      type="button"
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
    </button>
  )
}
