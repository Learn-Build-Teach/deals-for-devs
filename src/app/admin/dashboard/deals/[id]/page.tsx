import { notFound } from 'next/navigation'
import { getDealById, getDealByIdAsAdmin } from '@/lib/queries'
import DealPreview from '@/components/DealPreview'
import { Metadata, ResolvingMetadata } from 'next'
import EditDealForm from '@/components/dashboard/EditDealForm'

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
  const deal = await getDealByIdAsAdmin(params.id)

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

export default async function EditDealPage({
  params,
}: {
  params: { id: string }
}) {
  if (!params.id) {
    notFound()
  }
  const deal = await getDealByIdAsAdmin(params.id)
  if (!deal) {
    notFound()
  }

  return (
    <main>
      <section className="mx-auto space-y-12 px-4 pb-10">
        <h2 className="text-center text-5xl text-white">{deal.name}</h2>
        <EditDealForm deal={deal} />
      </section>
    </main>
  )
}
