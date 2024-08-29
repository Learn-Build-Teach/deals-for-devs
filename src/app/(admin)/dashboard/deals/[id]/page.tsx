import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import EditDealForm from '@/components/dashboard/EditDealForm'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'
import Link from 'next/link'

export default async function EditDealPage({
  params: { id },
}: {
  params: { id: string }
}) {
  if (!id) {
    notFound()
  }
  const deal = await getDealByIdAsAdmin(id)
  if (!deal) {
    notFound()
  }

  return (
    <section>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <h1 className="text-center text-5xl text-white">Edit Deal</h1>
        <div className="flex gap-x-4">
          <Link
            href={`/dashboard/deals/${deal.xata_id}/reports`}
            className="flex items-center justify-center gap-x-2 rounded-md border-2 border-blue-50 bg-blue-50 px-4 py-2 text-center text-blue-700 transition-colors hover:border-blue-700 "
          >
            View Reports
          </Link>
          <DeleteDealButton id={id} />
        </div>
      </div>
      <EditDealForm deal={deal} />
    </section>
  )
}
