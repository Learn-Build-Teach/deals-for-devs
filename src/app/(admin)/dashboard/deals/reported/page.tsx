import ManageDealsNav from '@/components/dashboard/ManageDealsNav'

export default async function Deals() {
  return (
    <section>
      <h1 className="mb-12 text-center text-5xl text-white">
        Reported Deals (coming soon)
      </h1>
      <ManageDealsNav tabIndex={4} />
    </section>
  )
}
