import { getAllDeals, getAllUnapprovedDeals } from '@/lib/queries'
import DealsList from '@/components/deals/DealsList'

export default async function Deals() {
  const deals = await getAllUnapprovedDeals()

  return (
    <section className="mx-auto space-y-12 px-4 pb-10">
      <h2 className="text-center text-5xl text-white">Manage Deals</h2>
      <div className="mx-auto lg:col-span-2">
        <DealsList deals={deals} isAdmin={true} />
      </div>
    </section>
  )
}
