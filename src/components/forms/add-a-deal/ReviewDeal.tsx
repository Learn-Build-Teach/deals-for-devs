'use client'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function ReviewDeal() {
  const { currentStep, setCurrentStep, newDealData, updateNewDealDetails } =
    useAddDealContext()
  const router = useRouter()

  return (
    <section className="mx-auto">
      <div className="flex max-w-[700px] flex-col">
        <div className="flex gap-8">
          {/* display image & percent badge */}
          <div className="relative flex">
            {/* DISPLAY IMAGE */}
            {/* NO IMAGE - display white box with deal name as text */}
            <div className="flex h-40 w-60 items-center justify-center rounded-xl bg-white">
              <p className="flex flex-wrap text-center text-3xl font-semibold text-black">
                {newDealData?.productName}
              </p>
            </div>
            {/* display the percent off badge if indicated*/}
            {newDealData?.percentage && (
              <div className="absolute right-2 top-2 flex h-9 w-9 -rotate-[21deg] flex-col items-center justify-center rounded-full bg-[#C4B97A] text-xs text-black shadow-black drop-shadow-2xl">
                <span className="-mb-1 mt-1 text-center font-bold">{`${newDealData.percentage}%`}</span>
                <span className="text-[6px] font-semibold uppercase">off</span>
              </div>
            )}
          </div>
          {/* Deal Information */}
          <div className="flex flex-col">
            <span className="text-3xl">{newDealData.productName}</span>
            {/* website */}
            <div className="mt-4 flex gap-2 text-lg">
              <span className="font-light text-white/70">Website:</span>
              <span className="font-light text-white">
                <a
                  href={newDealData.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {newDealData.url}
                </a>
              </span>
            </div>
            {/* Coupon Code */}
            <div className="mt-1.5 flex gap-2">
              <span className="font-light text-white/70">Coupon Code:</span>
              <span className="font-light text-white">
                {newDealData.couponCode || 'No coupon code required'}
              </span>
            </div>
            {/* Valid From */}
            <div className="mt-1.5 flex gap-2">
              <span className="font-light text-white/70">Valid from:</span>
              <span className="font-light text-white">
                {`${format(new Date(newDealData.startDate), 'MMM d')} - ${format(new Date(newDealData.endDate), 'MMM d, yyyy')}` ||
                  'No coupon code required'}
              </span>
            </div>
            {/* Category*/}
            <div className="mt-1.5 flex gap-2">
              <span className="font-light text-white/70">Category:</span>
              <span className="font-light text-white">
                {newDealData.category || 'No coupon code required'}
              </span>
            </div>
          </div>
        </div>
        {/* deal description */}
        <div className="mt-10 flex w-full max-w-[700px] flex-col items-start text-lg ">
          <span className="font-bold uppercase">DESCRIPTION</span>
          <p className="font-light">{newDealData.summary}</p>
        </div>
        <button
          type="button"
          className="mt-10 rounded-lg bg-teal-600 py-7 text-2xl text-black"
          aria-label="Click to continue"
        >
          Continue
        </button>
      </div>
    </section>
  )
}
