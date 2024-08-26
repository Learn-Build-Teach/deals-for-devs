import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import { Metadata, ResolvingMetadata } from 'next'
import EditDealForm from '@/components/dashboard/EditDealForm'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'
import ApproveDealButton from '@/components/dashboard/ApproveDealButton'

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
    <section>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <h1 className="text-center text-5xl text-white">Edit Deal</h1>
        <DeleteDealButton id={id} />
      </div>
      <EditDealForm deal={deal} />
    </section>
  )
}
