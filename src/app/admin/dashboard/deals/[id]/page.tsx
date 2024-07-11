import { notFound } from 'next/navigation'
import { getDealByIdAsAdmin } from '@/lib/queries'
import { Metadata, ResolvingMetadata } from 'next'
import EditDealForm from '@/components/dashboard/EditDealForm'
import RejectDealButton from '@/components/dashboard/RejectDealButton'
import ApproveDealButton from '@/components/dashboard/ApproveDealButton'
import { Delete } from 'lucide-react'
import DeleteDealButton from '@/components/dashboard/DeleteDealButton'

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
    <main>
      <section className="mx-auto space-y-12 px-4 pb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-5xl text-white">Edit Deal</h1>
          {!deal.approved && (
            <div className="flex justify-end gap-x-4 py-4">
              <RejectDealButton id={id} />
              <ApproveDealButton id={id} />
            </div>
          )}
          {deal.approved && <DeleteDealButton id={id} />}
        </div>
        <EditDealForm deal={deal} />
      </section>
    </main>
  )
}
