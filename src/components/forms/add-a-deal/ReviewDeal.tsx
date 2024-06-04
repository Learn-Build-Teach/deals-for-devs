'use client'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import z from 'zod'
import { createDeal } from '@/lib/queries'
import Image from 'next/image'
import DealGradientPlaceholder from '@/components/DealGradientPlaceholder'
import { Category } from '@/types/Types'
import DealPreview from '@/components/DealPreview'

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

  return (
    <section className="w-full">
      <div className="flex flex-col">
        <DealPreview
          name={newDealData.productName}
          url={newDealData.url}
          couponCode={newDealData.couponCode}
          couponPercent={newDealData.percentage}
          coverImageURL={newDealData.coverImageURL}
          startDate={new Date(newDealData.startDate)}
          endDate={new Date(newDealData.endDate)}
          category={newDealData.category}
          description={newDealData.description}
        />
        <button
          type="button"
          className="mt-5 rounded-lg bg-teal-600 py-4 text-lg text-black disabled:bg-teal-600/30 lg:mt-10 lg:py-7 lg:text-2xl"
          aria-label="Click to continue"
          onClick={validateAndSubmit}
        >
          Submit Deal
        </button>
      </div>
    </section>
  )
}
