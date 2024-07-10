import PendingDeals from './PendingDeals'

export default async function Deals() {
  return (
    <section className="mx-auto space-y-12 px-4 pb-10">
      <h1 className="text-center text-5xl text-white">Manage Deals</h1>
      <PendingDeals />
    </section>
  )
}
