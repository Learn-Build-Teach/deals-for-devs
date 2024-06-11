'use client'
import Input from '@/components/forms/add-a-deal/Input'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'
import { DatePicker } from '../DatePicker'

export default function CouponDetails() {
  const { currentStep, setCurrentStep, newDealData, updateNewDealDetails } =
    useAddDealContext()
  console.log(newDealData)
  const router = useRouter()

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
    router.push(`/deals/add/${AddDealRoutes.CONTACT_INFO}`)
  }

  return (
    <form onSubmit={nextStep} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-base font-extralight md:text-2xl">
              Start date
            </span>
            <DatePicker
              onDateChange={(date: Date | undefined) => {
                console.log(date)
                updateNewDealDetails({
                  startDate: date?.toLocaleString(),
                })
              }}
              initialDate={new Date(newDealData.startDate)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base font-extralight md:text-2xl">
              End date
            </span>
            <DatePicker
              onDateChange={(date: Date | undefined) => {
                updateNewDealDetails({
                  endDate: date?.toLocaleDateString(),
                })
              }}
              initialDate={new Date(newDealData.startDate)}
            />
          </div>
        </div>
        <div className="flex items-center gap-12">
          <Input
            className="flex-1"
            label="Coupon Code"
            value={newDealData?.couponCode}
            onChange={(e) => {
              updateNewDealDetails({ couponCode: e.target.value })
            }}
            required={false}
          />
          <Input
            className="w-1/4"
            label="Discount %"
            type="number"
            value={newDealData?.percentage}
            required={false}
            onChange={(e) =>
              updateNewDealDetails({
                percentage: e.target.valueAsNumber || undefined,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-teal-600 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
          aria-label="Click to continue"
        >
          Continue
        </button>
      </div>
    </form>
  )
}
