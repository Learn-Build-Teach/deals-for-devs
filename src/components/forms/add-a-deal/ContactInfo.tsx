'use client'
import Input from '@/components/forms/add-a-deal/Input'
import { useAddDealContext } from '@/context/AddDealContext'
import Loading from '@/components/Loading'
import { FormBlurs, FormErrors } from '@/app/deals/add/types'
import { contactDetailsSchema } from '@/app/deals/add/schemas'
import { useFormState } from 'react-dom'
import { submitContactDetailsAction } from '@/app/deals/add/actions'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

const initialState: FormErrors = {}
const inputNames = ['contactName', 'contactEmail']

export default function ContactInfo() {
  const { newDealData, updateNewDealDetails, dataLoaded } = useAddDealContext()
  const searchParams = useSearchParams()

  const [serverErrors, formAction] = useFormState(
    submitContactDetailsAction,
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
          noValidate
        >
          <div className="flex h-full w-full flex-col justify-between lg:max-w-[700px]">
            <div className="flex flex-col gap-7">
              <Input
                label="Full Name *"
                name="contactName"
                value={newDealData?.contactName}
                onChange={handleInputChange}
                onBlur={() => setBlurs({ ...blurs, contactName: true })}
                required={true}
                error={blurs.contactName ? errors.contactName : undefined}
              />
              <Input
                label="Email *"
                name="contactEmail"
                value={newDealData?.contactEmail}
                onChange={handleInputChange}
                onBlur={() => setBlurs({ ...blurs, contactEmail: true })}
                required={true}
                error={blurs.contactEmail ? errors.contactEmail : undefined}
              />
            </div>
            <button
              type="submit"
              className="mt-6 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
              aria-label="Click to continue"
            >
              Review Deal
            </button>
          </div>
        </form>
      )}
    </>
  )
}
