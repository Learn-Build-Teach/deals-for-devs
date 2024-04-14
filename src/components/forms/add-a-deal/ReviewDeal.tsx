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

      console.log(res)
      return toast.success('Deal submitted successfully')
    } catch (error) {
      return toast.error('Please fill out all required fields')
    }
  }

  const imageSrc =
    newDealData.coverImageURL ?
      newDealData.coverImageURL
    : '/images/defaultImage.jpg'

  return (
    <section className="mx-auto">
      <div className="flex max-w-[700px] flex-col">
        <div className="flex gap-8">
          {/* display image & percent badge */}
          <div className="relative flex">
            <div className="relative flex h-40 w-60 items-center justify-center aspect-video">
              <Image
                src={imageSrc}
                alt={newDealData.productName}
                layout="fill"
                className="rounded-lg"
              />
            </div>
            {/* display the percent off badge if indicated*/}
            {newDealData?.percentage && (
              <div className="absolute right-1 top-1 flex h-9 w-9 -rotate-[21deg] flex-col items-center justify-center rounded-full bg-[#C4B97A] text-xs text-black shadow-black drop-shadow-2xl">
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
          <p className="font-light">{newDealData.description}</p>
        </div>
        <button
          type="button"
          className="mt-10 rounded-lg bg-teal-600 py-7 text-2xl text-black"
          aria-label="Click to continue"
          onClick={validateAndSubmit}
        >
          Submit Deal
        </button>
      </div>
    </section>
  )
}
