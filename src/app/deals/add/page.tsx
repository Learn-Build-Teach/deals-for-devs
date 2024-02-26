import DealForm from './DealForm'
import { redirect } from 'next/navigation'

//TODO: why doesn't this work with server component page?
// export const metadata: Metadata = {
//   title: 'Add a Black Friday Deal',
//   description: 'Share the best deals that you know developers will love!',
// };

export default function AddDealPage() {
  redirect('/')
  return (
    <main className="">
      <h1 className="py-20 text-center text-4xl font-bold text-gray-100">
        Share a Deal
      </h1>
      <div className="mx-auto max-w-2xl pb-20">
        <DealForm />
      </div>
    </main>
  )
}
