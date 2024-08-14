import { notFound } from 'next/navigation'
import { getApprovedDeals, getDealById } from '@/lib/queries'
import { Metadata } from 'next'
import DealPreview from '@/components/deals/DealPreview'
import { Tag } from '@prisma/client'

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
  console.log(deal)
  if (!deal) {
    notFound()
  }
  const tags = deal.tags.map((tag: Tag) => tag.text)

  return (
    <main>
      <div className="pb-10">
        <DealPreview
          name={deal.name}
          link={deal.link}
          coupon={deal.coupon}
          couponPercent={deal.couponPercent}
          coverImageURL={deal.coverImageURL}
          startDate={deal.startDate}
          endDate={deal.endDate || undefined}
          category={deal.category}
          description={deal.description}
          tags={tags}
        />
      </div>
    </main>
  )
}
