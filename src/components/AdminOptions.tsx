import { approveDealAction, deleteDealAction } from '@/actions/deals'
import toast from 'react-hot-toast'

export default function AdminOptions({ id }: { id: string }) {
  const handleApprove = async () => {
    try {
      await approveDealAction(id)
      toast.success('Deal approved')
    } catch (error) {
      toast.error('Error approving deal')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDealAction(id)
      toast.success('Deal deleted')
    } catch (error) {
      toast.error('Error deleting deal')
    }
  }
  return (
    <div className="mt-4 flex gap-x-4">
      <form action={handleApprove}>
        <button className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">
          Approve
        </button>
      </form>
      <form action={handleDelete}>
        <button className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">
          Reject
        </button>
      </form>
    </div>
  )
}
