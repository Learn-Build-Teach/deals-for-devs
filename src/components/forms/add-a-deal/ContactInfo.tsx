'use client'
import Input from '@/components/forms/add-a-deal/Input'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'

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
      <div className="flex h-full w-full flex-col justify-between lg:max-w-[700px]">
        <div className="flex flex-col gap-7">
          <Input
            label="Full Name *"
            value={newDealData?.contactName}
            onChange={(e) => {
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
          className="mt-6 rounded-lg bg-teal-600 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
          aria-label="Click to continue"
        >
          Review Deal
        </button>
      </div>
    </form>
  )
}
