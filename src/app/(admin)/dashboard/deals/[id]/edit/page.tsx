import { notFound } from 'next/navigation'
import EditDealForm from '@/components/dashboard/EditDealForm'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { getDealByIdAsAdmin } from '@/queries/adminDeals'

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
    <Section>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <PageHeader heading="Edit Deal" />
        <DeleteDealButton id={id} />
      </div>
      <EditDealForm deal={deal} />
    </Section>
  )
}
