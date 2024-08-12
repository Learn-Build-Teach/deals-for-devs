'use client'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import toast from 'react-hot-toast'
import Loading from '@/components/Loading'
import { submitDealAction } from '@/app/deals/add/actions'
import { NewDealType } from '@/app/deals/add/schemas'
import DealPreview from '@/components/deals/DealPreview'

export default function ReviewDeal() {
  const { newDealData, dataLoaded } = useAddDealContext()

  //* cast deal data to final submission type
  const dataToSubmit = newDealData as NewDealType
  const router = useRouter()

  const validateAndSubmit = async () => {
    const { error, redirect } = await submitDealAction(
      newDealData as NewDealType
    )
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
        <div>
          <DealPreview
            name={dataToSubmit.name}
            link={dataToSubmit.link}
            coupon={dataToSubmit.coupon}
            couponPercent={dataToSubmit.couponPercent}
            coverImageURL={dataToSubmit.coverImageURL}
            startDate={new Date(dataToSubmit.startDate)}
            endDate={
              dataToSubmit?.endDate ? new Date(dataToSubmit.endDate) : undefined
            }
            tags={dataToSubmit.tags}
            category={dataToSubmit.category}
            description={dataToSubmit.description}
          />
          <div className=" mx-auto max-w-[800px]">
            <button
              type="button"
              className="mt-5 w-full rounded-lg bg-teal-500 px-10 py-4 text-lg text-black disabled:bg-teal-600/30 lg:mt-10 lg:py-7 lg:text-2xl"
              aria-label="Click to continue"
              onClick={validateAndSubmit}
            >
              Submit Deal
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
