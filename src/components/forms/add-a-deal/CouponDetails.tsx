'use client'
import Input from '@/components/forms/add-a-deal/Input'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'
import { DatePickerWithRange } from '../DatePicker'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import toast from 'react-hot-toast'

export default function CouponDetails() {
  const { currentStep, setCurrentStep, newDealData, updateNewDealDetails } =
    useAddDealContext()
  const router = useRouter()

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
    router.push(`/deals/add/${AddDealRoutes.CONTACT_INFO}`)
  }

  return (
    <form onSubmit={nextStep} className="flex flex-1 flex-col items-center">
      <div className="flex flex-col gap-14 md:w-full md:max-w-[700px]">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-extralight">Valid date range *</span>
          <DatePickerWithRange
            onDateRangeChange={(range: DateRange) => {
              updateNewDealDetails({
                startDate: range.from?.toISOString(),
                endDate: range.to?.toISOString(),
              })
            }}
            initialFrom={new Date()}
            initialTo={addDays(new Date(), 7)}
          />
        </div>
        <div className="flex items-center gap-12">
          <Input
            className="flex-1"
            label="Coupon Code"
            value={newDealData?.couponCode}
            onChange={(e) => {
              console.log(e.target.name, e.target.value)
              updateNewDealDetails({ couponCode: e.target.value })
            }}
            required={false}
          />
          <Input
            className="w-1/5"
            label="% Discount"
            type="number"
            value={newDealData?.percentage}
            required={false}
            onChange={(e) =>
              updateNewDealDetails({ percentage: Number(e.target.value) })
            }
          />
        </div>

        <button
          type="submit"
          className="-mt-8 rounded-lg bg-teal-600 py-7 text-2xl text-black"
          aria-label="Click to continue"
        >
          Continue
        </button>
      </div>
    </form>
  )
}
