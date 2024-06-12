import { notFound } from 'next/navigation'
import { getDealById } from '@/lib/queries'
import DealPreview from '@/components/DealPreview'

export const revalidate = 120

export default async function DealPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    //not found
  }
  const deal = await getDealById(params.id)
  if (!deal) {
    notFound()
  }

  return (
    <div>
      <div className="pb-10">
        <DealPreview
          name={deal.name}
          url={deal.link}
          couponCode={deal.coupon}
          couponPercent={deal.couponPercent}
          coverImageURL={deal.coverImageURL}
          startDate={deal.startDate}
          endDate={deal.endDate || undefined}
          category={deal.category}
          description={deal.description}
        />
      </div>
    </div>
  )
}
