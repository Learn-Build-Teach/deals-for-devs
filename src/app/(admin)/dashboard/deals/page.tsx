import { getAllDeals } from '@/lib/queries'
import DealsList from '@/components/deals/DealsList'

export default async function Deals() {
  // fetch all deals
  const dealsData = getAllDeals()
  const [deals] = await Promise.all([dealsData])
  const dealsList = JSON.parse(JSON.stringify(deals))

  return (
    <section className="mx-auto space-y-12 px-4 pb-10">
      <h2 className="text-center text-5xl text-white">Manage Deals</h2>
      <div className="mx-auto lg:col-span-2">
        <DealsList deals={dealsList} />
      </div>
    </section>
  )
}
