'use client'
import Input from '@/components/forms/add-a-deal/Input'
import { useAddDealContext } from '@/context/AddDealContext'
import { DatePicker } from '../DatePicker'
import Loading from '@/components/Loading'
import { useFormState } from 'react-dom'
import { FormBlurs, FormErrors } from '@/app/deals/add/types'
import { submitCouponDetailsAction } from '@/app/deals/add/actions'
import { contactDetailsSchema } from '@/app/deals/add/schemas'
import { useState, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

const initialState: FormErrors = {}
const inputNames = ['startDate', 'endDate', 'coupon', 'couponPercent']

export default function CouponDetails() {
  const { newDealData, updateNewDealDetails, dataLoaded } = useAddDealContext()
  const searchParams = useSearchParams()

  const [serverErrors, formAction] = useFormState(
    submitCouponDetailsAction,
    initialState
  )

  const [errors, setErrors] = useState<FormErrors>({})

  const [blurs, setBlurs] = useState<FormBlurs>({})

  const setAllBlurred = useCallback(() => {
    const allBlurred = inputNames.reduce((acc: FormBlurs, name) => {
      acc[name] = true
      return acc
    }, {})
    setBlurs(allBlurred)
  }, [])

  useEffect(() => {
    if (searchParams.get('validate') === 'true') {
      setAllBlurred()
      validateFormInput()
    }
  }, [])

  useEffect(() => {
    setErrors((prevErrors) => {
      return { ...prevErrors, ...serverErrors }
    })
  }, [serverErrors, setAllBlurred])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateNewDealDetails({ [e.target.name]: e.target.value })
    validateFormInput(e.target.name, e.target.value)
  }

  const validateFormInput = (name?: string, value?: string): boolean => {
    const tempFormData: any = {
      contactName: newDealData.contactName,
      contactEmail: newDealData.contactEmail,
    }
    if (name) {
      tempFormData[name] = value
    }

    const validated = contactDetailsSchema.safeParse(tempFormData)
    if (!validated.success) {
      const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
        const path = issue.path[0] as string
        acc[path] = issue.message
        return acc
      }, {})
      setErrors(errors)
      return false
    } else {
      if (name) {
        setErrors({
          ...errors,
          [name]: undefined,
        })
      }
      return true
    }
  }
  return (
    <>
      {!dataLoaded && (
        <div className="mx-auto">
          <Loading />
        </div>
      )}
      {dataLoaded && (
        <form
          action={(formData) => {
            setAllBlurred()
            formAction(formData)
            toast.error('Please review your inputs')
          }}
          className="flex flex-1 flex-col items-center"
        >
          <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
            <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="text-base font-extralight md:text-2xl">
                  Start date*
                </span>
                <DatePicker
                  onDateChange={(date: Date | undefined) => {
                    if (dataLoaded) {
                      updateNewDealDetails({
                        startDate: date?.toISOString(),
                      })
                    }
                  }}
                  initialDate={new Date(newDealData.startDate)}
                />
              </div>
              <input
                type="hidden"
                name="startDate"
                value={newDealData.startDate}
              />
              <input type="hidden" name="endDate" value={newDealData.endDate} />
              <div className="flex flex-col gap-2">
                <span className="text-base font-extralight md:text-2xl">
                  End date
                </span>
                <DatePicker
                  onDateChange={(date: Date | undefined) => {
                    if (dataLoaded) {
                      updateNewDealDetails({
                        endDate: date?.toISOString() || undefined,
                      })
                    }
                  }}
                  initialDate={
                    newDealData.endDate ?
                      new Date(newDealData.endDate)
                    : undefined
                  }
                />
              </div>
            </div>
            <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
              <Input
                label="Coupon Code"
                name="coupon"
                value={newDealData?.coupon}
                onChange={handleInputChange}
                onBlur={() => setBlurs({ ...blurs, coupon: true })}
                required={false}
                error={blurs.coupon ? errors.coupon : undefined}
              />
              <Input
                label="Discount %"
                name="couponPercent"
                value={newDealData?.couponPercent}
                onChange={handleInputChange}
                onBlur={() => setBlurs({ ...blurs, couponPercent: true })}
                required={false}
                error={blurs.couponPercent ? errors.couponPercent : undefined}
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
              aria-label="Click to continue"
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </>
  )
}
