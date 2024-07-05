import { notFound } from 'next/navigation'
import { getDealById } from '@/lib/queries'
import DealPreview from '@/components/DealPreview'
import { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 120

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
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
    //not found
  }
  const deal = await getDealById(params.id)
  if (!deal) {
    notFound()
  }

  return (
<<<<<<< HEAD
    <main>
=======
    <div>
>>>>>>> b2377d9258f9cc39796a3e3fcedbce1f05656164
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
<<<<<<< HEAD
    </main>
=======
    </div>
>>>>>>> b2377d9258f9cc39796a3e3fcedbce1f05656164
  )
}
