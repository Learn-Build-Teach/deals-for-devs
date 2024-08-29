import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import DealDetails from '@/components/deals/DealDetails'
import { Button } from '@/components/ui/button'
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
        <h1 className="text-center text-5xl text-white">{deal.name}</h1>
        <Link href={`/dashboard/deals/${deal.xata_id}/edit`}>Edit Deal</Link>
      </div>
      <DealDetails deal={deal} />
    </Section>
  )
}
