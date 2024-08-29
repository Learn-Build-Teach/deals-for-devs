import { notFound } from 'next/navigation'
import { getApprovedDeals, getDealById } from '@/lib/queries'
import { Metadata } from 'next'
import DealDetails from '@/components/deals/DealDetails'

export const revalidate = 120

type Props = {
  params: { id: string }
}

export const dynamicParams = true

export async function generateStaticParams() {
  const deals = await getApprovedDeals()

  return deals.map((deal) => ({
    id: deal.xata_id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const deal = await getDealById(params.id)

  if (!deal) {
    return {
      title: 'Deal not found',
    }
  }

  return {
    title: deal?.name,
    description: deal?.description,
    openGraph: {
      images: [deal?.coverImageURL || '/logo-wide.png'],
    },
  }
}

export default async function DealPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound()
  }

  const deal = await getDealById(params.id)
  if (!deal) {
    notFound()
  }

  return (
    <main className="pb-20">
      <DealDetails deal={deal} />
    </main>
  )
}
