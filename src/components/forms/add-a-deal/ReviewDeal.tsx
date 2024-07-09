'use client'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import toast from 'react-hot-toast'
import DealPreview from '@/components/DealPreview'
import Loading from '@/components/Loading'
import { submitDealAction } from '@/app/deals/add/actions'

export default function ReviewDeal() {
  const { newDealData, dataLoaded } = useAddDealContext()
  const router = useRouter()

  const validateAndSubmit = async () => {
    const { error, redirect } = await submitDealAction(newDealData)
    if (error) {
      toast.error(error)
      if (redirect) {
        return router.push(redirect + '?validate=true')
      }
    } else {
      toast.success('Deal submitted successfully')
      localStorage.removeItem('deals-for-devs-newDealData')
      return router.push('/deals')
    }
  }

  return (
    <section className="w-full">
      {!dataLoaded && (
        <div className="mx-auto">
          <Loading />
        </div>
      )}
      {dataLoaded && (
        <div className="flex flex-col">
          {/* TODO: how to fix TypeScript errors here */}
          <DealPreview
            name={newDealData.name}
            link={newDealData.link}
            coupon={newDealData.coupon}
            couponPercent={newDealData.couponPercent}
            coverImageURL={newDealData.coverImageURL}
            startDate={new Date(newDealData.startDate)}
            endDate={
              newDealData?.endDate ? new Date(newDealData.endDate) : undefined
            }
            category={newDealData.category}
            description={newDealData.description}
          />
          <button
            type="button"
            className="mt-5 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:mt-10 lg:py-7 lg:text-2xl"
            aria-label="Click to continue"
            onClick={validateAndSubmit}
          >
            Submit Deal
          </button>
        </div>
      )}
    </section>
  )
}
