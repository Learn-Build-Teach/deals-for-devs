'use client'
import CategorySelect from '@/components/forms/add-a-deal/CategorySelect'
import Input from '@/components/forms/add-a-deal/Input'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import { useAddDealContext } from '@/context/AddDealContext'
import { useCallback, useEffect, useState } from 'react'
import { FormBlurs, FormErrors } from '@/app/deals/add/types'
import { productInfoSchema } from '@/app/deals/add/schemas'
import { useFormState } from 'react-dom'
import { submitProductInfoAction } from '@/app/deals/add/actions'
import ImageUpload from '@/app/deals/add/product-info/ImageUpload'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import Loading from '@/components/Loading'
import CommaSeparatedTags from './CommaSeparatedTagsInput'

const initialState: FormErrors = {}
const inputNames = [
  'name',
  'category',
  'link',
  'description',
  'coverImageURL',
  'coverImageId',
]

export default function ProductInfo() {
  const { newDealData, updateNewDealDetails, dataLoaded } = useAddDealContext()
  const searchParams = useSearchParams()

  const [serverErrors, formAction] = useFormState(
    submitProductInfoAction,
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

  const handleInputChange = (name: string, value: string) => {
    updateNewDealDetails({ [name]: value })
    validateFormInput(name, value)
  }

  const validateFormInput = (name?: string, value?: string): boolean => {
    const tempFormData: any = {
      name: newDealData.name,
      category: newDealData.category,
      tags: newDealData.tags,
      link: newDealData.link,
      description: newDealData.description,
      coverImageURL: newDealData.coverImageURL,
      coverImageId: newDealData.coverImageId,
    }
    if (name) {
      tempFormData[name] = value
    }

    const validated = productInfoSchema.safeParse(tempFormData)
    if (!validated.success) {
      const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
        const path = issue.path[0] as string
        acc[path] = issue.message
        return acc
      }, {})
      setErrors(errors)
      console.log(errors)
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
          <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
            <Input
              label="Product Name *"
              name="name"
              value={newDealData?.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onBlur={() => setBlurs({ ...blurs, name: true })}
              required={true}
              error={blurs.name ? errors.name : undefined}
            />
            <CategorySelect
              value={newDealData?.category}
              onCategoryChange={(category) => {
                //! necessary to check if data is loaded because otherwise category component will trigger a reset of local storage data
                if (dataLoaded) {
                  handleInputChange('category', category)
                }
              }}
              required={true}
              onBlur={() => setBlurs({ ...blurs, category: true })}
              error={blurs.category ? errors.category : undefined}
            />
            <CommaSeparatedTags />
            <Input
              label="Website URL*"
              name="link"
              description='Must start with "https://"'
              required={false}
              error={blurs.link ? errors.link : undefined}
              value={newDealData?.link}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onBlur={() => setBlurs({ ...blurs, link: true })}
            />
            <Textarea
              label="Product Description *"
              name="description"
              required={true}
              value={newDealData?.description}
              error={blurs.description ? errors.description : undefined}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onBlur={() => setBlurs({ ...blurs, description: true })}
            />
            <ImageUpload />
            <button
              type="submit"
              className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </>
  )
}
