import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import DealDetails from '@/components/deals/details/DealDetails'
import ReportDealButton from '@/components/deals/details/ReportDealButton'
import ShareDealButton from '@/components/deals/details/ShareDealButton'
import Section, { SECTION_STYLE, SECTION_WIDTH } from '@/components/Section'
import { getDealById, getDeals } from '@/queries/deals'

export const revalidate = 120

type Props = {
  params: { id: string }
}

export const dynamicParams = true

export async function generateStaticParams() {
  const deals = await getDeals({})

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
      <Section width={SECTION_WIDTH.SM} className="">
        <DealDetails deal={deal} />

        <div className="space-between flex flex-col justify-between gap-4 sm:flex-row">
          <ShareDealButton />
          <ReportDealButton dealId={deal.xata_id} />
        </div>
      </Section>
    </main>
  )
}
