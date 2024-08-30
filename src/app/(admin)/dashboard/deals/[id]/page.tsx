import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'
import DealDetails from '@/components/deals/details/DealDetails'
import Link from 'next/link'
import Section from '@/components/Section'

export default async function ViewDealAdminPage({
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
    <Section>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <h1 className="text-center text-5xl text-white">Edit Deal</h1>
        <div className="flex items-center gap-x-4">
          <Link
            href={`/dashboard/deals/${deal.xata_id}/reports`}
            className="text-slate-100 underline-offset-4 hover:underline dark:text-slate-50"
          >
            View Reports
          </Link>
          <DeleteDealButton id={id} />
        </div>
      </div>
      <DealDetails deal={deal} />
    </Section>
  )
}
