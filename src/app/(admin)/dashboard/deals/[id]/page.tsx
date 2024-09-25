import { notFound } from 'next/navigation'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'
import DealDetails from '@/components/deals/details/DealDetails'
import Section from '@/components/Section'
import { getDealByIdAsAdmin } from '@/queries/adminDeals'
import EditButton from '@/components/dashboard/EditButton'
import DealReportsLink from '@/components/dashboard/DealReportsLink'
import PageHeader from '@/components/PageHeader'

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
        <PageHeader heading="Manage Deal" />
        <div className="flex items-end gap-x-4">
          <DealReportsLink id={id} />
          <EditButton id={id} />
          <DeleteDealButton id={id} />
        </div>
      </div>
      <DealDetails deal={deal} />
    </Section>
  )
}
