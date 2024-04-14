'use client'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import z from 'zod'
import { createDeal } from '@/lib/queries'
import Image from 'next/image'

export default function ReviewDeal() {
  const { newDealData } = useAddDealContext()
  const router = useRouter()

  const submittedDealSchema = z.object({
    productName: z.string().min(1),
    category: z.string().min(1),
    url: z.string(),
    description: z.string().min(1),
    coverImageURL: z.string().optional(),
    coverImageId: z.string().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    couponCode: z.string().optional(),
    percentage: z.number().optional(),
    contactName: z.string().min(1),
    contactEmail: z.string().min(1),
  })

  const validateAndSubmit = async () => {
    try {
      const parsed = submittedDealSchema.parse(newDealData)
      // if the data is valid, submit the deal to db

      const res = await createDeal({
        name: parsed.productName,
        category: parsed.category,
        link: parsed.url,
        description: parsed.description,
        coverImageURL: parsed.coverImageURL,
        coverImageId: parsed.coverImageId,
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        coupon: parsed.couponCode,
        couponPercent: parsed.percentage,
        contactName: parsed.contactName,
        contactEmail: parsed.contactEmail,
      })

      toast.success('Deal submitted successfully')
      localStorage.removeItem('deals-for-devs-newDealData')
      return router.push('/deals')
    } catch (error) {
      return toast.error('Please fill out all required fields')
    }
  }

  const coverImage =
    newDealData.coverImageURL ?
      newDealData.coverImageURL
    : '/images/defaultImage.jpg'

  return (
    <section className="mx-auto">
      <div className="flex max-w-[700px] flex-col">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* display image & percent badge */}
          <div className="relative">
            <div className="relative  h-40 w-96 overflow-hidden md:w-60">
              <Image
                src={coverImage}
                alt={newDealData.productName}
                className="rounded-lg"
                fill={true}
                priority
              />
            </div>
            {/* display the percent off badge if indicated */}
            {newDealData?.percentage && (
              <div className="absolute right-1 top-1 flex h-9 w-9 -rotate-[21deg] flex-col items-center justify-center rounded-full bg-[#C4B97A] text-xs text-black shadow-black drop-shadow-2xl">
                <span className="-mb-1 mt-1 text-center font-bold">{`${newDealData.percentage}%`}</span>
                <span className="text-[6px] font-semibold uppercase">off</span>
              </div>
            )}
          </div>
          {/* Deal Information */}
          <div className="flex flex-col">
            <span className="text-xl md:text-3xl">
              {newDealData.productName}
            </span>
            {/* website */}
            <div className="mt-2 flex gap-2 text-sm md:mt-4 md:text-lg">
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
            <div className="flex gap-2 text-sm md:mt-1.5 md:text-lg">
              <span className="font-light text-white/70">Coupon Code:</span>
              <span className="font-light text-white">
                {newDealData.couponCode || 'No coupon code required'}
              </span>
            </div>
            {/* Valid From */}
            <div className="flex gap-2 text-sm md:mt-1.5 md:text-lg">
              <span className="font-light text-white/70">Valid from:</span>
              <span className="font-light text-white">
                {`${format(new Date(newDealData.startDate), 'MMM d')} - ${format(new Date(newDealData.endDate), 'MMM d, yyyy')}` ||
                  'No coupon code required'}
              </span>
            </div>
            {/* Category*/}
            <div className="flex gap-2 text-sm md:mt-1.5 md:text-lg">
              <span className="font-light text-white/70">Category:</span>
              <span className="font-light text-white">
                {newDealData.category || 'No coupon code required'}
              </span>
            </div>
          </div>
        </div>
        {/* deal description */}
        <div className="mt-5 flex w-full max-w-[700px] flex-col items-start text-sm md:mt-10 md:text-lg ">
          <span className="font-bold uppercase">DESCRIPTION</span>
          <p className="font-light">{newDealData.description}</p>
        </div>
        <button
          type="button"
          className="mt-5 rounded-lg bg-teal-600 py-2 text-lg text-black disabled:bg-teal-600/30 md:mt-10 md:py-7 md:text-2xl"
          aria-label="Click to continue"
          onClick={validateAndSubmit}
        >
          Submit Deal
        </button>
      </div>
    </section>
  )
}
