'use client'
import Input from '@/components/forms/add-a-deal/Input'
import CategorySelect from '@/components/forms/add-a-deal/CategorySelect'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'
import { deleteImage } from '@/lib/imageUpload'
import toast from 'react-hot-toast'

export default function ContactInfo() {
  const { currentStep, setCurrentStep, newDealData, updateNewDealDetails } =
    useAddDealContext()
  const router = useRouter()

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
    router.push(`/deals/add/${AddDealRoutes.REVIEW_DEAL}`)
  }

  return (
    <form onSubmit={nextStep} className="flex flex-1 flex-col items-center">
      <div className="flex h-full flex-col justify-between w-full md:max-w-[700px]">
        <div className="flex flex-col gap-7">
          <Input
            label="Full Name *"
            value={newDealData?.contactName}
            onChange={(e) => {
              console.log(e.target.value)
              updateNewDealDetails({ contactName: e.target.value })
            }}
          />
          <Input
            label="Email *"
            value={newDealData?.contactEmail}
            required={false}
            onChange={(e) =>
              updateNewDealDetails({ contactEmail: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="mt-6 rounded-lg bg-teal-600 py-2 text-lg text-black disabled:bg-teal-600/30 md:-mt-4 md:py-7 md:text-2xl"
          aria-label="Click to continue"
        >
          Review Deal
        </button>
      </div>
    </form>
  )
}
