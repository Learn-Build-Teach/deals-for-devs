import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import { getReportsByDealAsAdmin } from '@/queries/reports'
import ReportsList from '@/components/dashboard/reports/ReportsList'
import { CiEdit } from 'react-icons/ci'
import Link from 'next/link'

export default async function DealReportsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  if (!id) {
    notFound()
  }
  const deal = await getDealByIdAsAdmin(id)
  const reports = await getReportsByDealAsAdmin(id)
  if (!deal) {
    notFound()
  }

  return (
    <section>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <div className="flex w-full justify-between">
          <h1 className="text-center text-5xl text-white">
            Reports for <span className="font-bold">{deal.name}</span>
          </h1>
          <Link
            href={`/dashboard/deals/${deal.xata_id}`}
            className="flex items-center justify-center gap-x-2 rounded-md border-2 border-blue-50 bg-blue-50 px-4 py-2 text-center text-blue-700 transition-colors hover:border-blue-700 "
          >
            View Deal
          </Link>
        </div>
      </div>
      <ReportsList reports={reports} deal={deal} />
    </section>
  )
}
