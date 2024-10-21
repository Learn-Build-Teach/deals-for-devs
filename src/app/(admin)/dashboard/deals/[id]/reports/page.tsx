import { notFound } from 'next/navigation'
import { getReportsByDealAsAdmin } from '@/queries/reports'
import ReportsList from '@/components/dashboard/reports/ReportsList'
import { CiEdit } from 'react-icons/ci'
import Link from 'next/link'
import { getDealByIdAsAdmin } from '@/queries/adminDeals'
import BackToDealLink from '@/components/dashboard/BackToDealLink'
import Section from '@/components/Section'
import PageHeader from '@/components/PageHeader'

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
    <Section>
      <BackToDealLink id={id} />
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <PageHeader heading="Reports" />
      </div>

      <ReportsList reports={reports} deal={deal} />
    </Section>
  )
}
