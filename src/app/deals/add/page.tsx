import Separator from '@/components/Separator'
import DealForm from './DealForm'

//TODO: why doesn't this work with server component page?
// export const metadata: Metadata = {
//   title: 'Add a Black Friday Deal',
//   description: 'Share the best deals that you know developers will love!',
// };

export default function AddDealPage() {
  return (
    <main className="">
      <h1 className="mb-4 text-7xl font-semibold text-white">Share a Deal</h1>
      <span className="text-2xl font-light text-white">
        Have an amazing deal or discount tailored for developers? Let us know!
      </span>
      <Separator className="mb-32 mt-14" />

      <DealForm />
    </main>
  )
}
