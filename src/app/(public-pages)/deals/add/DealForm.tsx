'use client'

import { useEffect, useState } from 'react'
import { DealFormServerState, FormBlurs, FormErrors } from './types'
import { useAddDealContext } from '@/context/AddDealContext'
import Input from '@/components/forms/add-a-deal/Input'
import CommaSeparatedTags from '@/components/forms/add-a-deal/CommaSeparatedTagsInput'
import CategorySelect from '@/components/forms/add-a-deal/CategorySelect'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import ImageUpload from './ImageUpload'
import { DatePicker } from '@/components/forms/DatePicker'
import SubmitButton from '@/components/dashboard/SubmitButton'
import { useFormState } from 'react-dom'
import { submitDealAction } from './actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const initialState: DealFormServerState = {}

export default function CreateDealForm() {
  const router = useRouter()
  const { newDealData, updateNewDealDetails, dataLoaded, resetData } =
    useAddDealContext()
  const [blurs, setBlurs] = useState<FormBlurs>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverState, formAction] = useFormState(submitDealAction, initialState)
  const [shouldResetData, setShouldResetData] = useState<boolean>(false)

  useEffect(() => {
    setErrors(serverState?.errors || {})
    if (serverState?.success) {
      toast.success('Deal submitted!')
      resetData()
      setShouldResetData(true)
    }
  }, [serverState])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!dataLoaded) return
    const { name, value } = e.target
    updateNewDealDetails({ [name]: value })
    setShouldResetData(false)
  }

  const handleImageUpload = (coverImageId: string, coverImageURL: string) => {
    if (!dataLoaded) return
    updateNewDealDetails({ coverImageId, coverImageURL })
  }

  const handleImageDeleted = (coverImageId: string) => {
    if (!dataLoaded) return
    updateNewDealDetails({ coverImageId: '', coverImageURL: '' })
  }

  const handleTagsUpdated = (tags: { text: string }[]) => {
    if (!dataLoaded) return
    updateNewDealDetails({ tags })
  }

  return (
    <form action={formAction}>
      <div className="flex w-full flex-col gap-7 lg:gap-14">
        <ImageUpload
          onImageUploaded={handleImageUpload}
          onImageDeleted={handleImageDeleted}
          initialCoverImageId={newDealData.coverImageId || undefined}
          initialCoverImageURL={newDealData.coverImageURL || undefined}
          shouldResetData={shouldResetData}
        />
        <Input
          label="Product Name *"
          name="name"
          required
          value={newDealData.name}
          onChange={handleInputChange}
          error={errors?.name || undefined}
        />
        <CommaSeparatedTags
          handleTagsUpdated={handleTagsUpdated}
          initialTags={newDealData.tags}
          shouldResetData={shouldResetData}
        />

        <CategorySelect
          value={newDealData.category}
          required
          onCategoryChange={(category) => {
            if (!dataLoaded) return
            updateNewDealDetails({ category })
          }}
        />
        <input type="hidden" name="category" value={newDealData.category} />
        <Input
          label="Website URL*"
          name="link"
          value={newDealData.link}
          onChange={handleInputChange}
          required
          error={errors?.link || undefined}
        />
        <Textarea
          label="Product Description *"
          name="description"
          value={newDealData.description}
          onChange={handleInputChange}
          error={errors?.description || undefined}
          required
        />

        <div className="flex w-full flex-col gap-7 lg:gap-14">
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
                initialDate={new Date()}
                disableDates={{ before: new Date() }}
              />
              <input
                type="hidden"
                name="startDate"
                value={newDealData.startDate}
              />
            </div>
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
                disableDates={{
                  before: new Date(newDealData.startDate),
                }}
              />
            </div>
          </div>
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
            <Input
              label="Coupon Code"
              name="coupon"
              value={newDealData.coupon || undefined}
              onBlur={() => setBlurs({ ...blurs, coupon: true })}
              required={false}
              onChange={handleInputChange}
              error={errors?.coupon || undefined}
            />
            <Input
              label="Discount %*"
              name="couponPercent"
              value={newDealData.couponPercent || undefined}
              onBlur={() => setBlurs({ ...blurs, couponPercent: true })}
              required={true}
              type="number"
              onChange={(e) => {
                if (!dataLoaded) return
                const numValue = Number(e.target.value)
                updateNewDealDetails({
                  couponPercent: Number.isNaN(numValue) ? undefined : numValue,
                })
              }}
              error={errors?.couponPercent || undefined}
            />
          </div>
          <div className="flex flex-col gap-7">
            <Input
              label="Full Name *"
              name="contactName"
              value={newDealData.contactName}
              onBlur={() => setBlurs({ ...blurs, contactName: true })}
              required={true}
              onChange={handleInputChange}
              error={errors?.contactName || undefined}
            />
            <Input
              label="Email *"
              name="contactEmail"
              type="email"
              value={newDealData.contactEmail}
              onBlur={() => setBlurs({ ...blurs, contactEmail: true })}
              required={true}
              error={errors?.contactEmail || undefined}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <SubmitButton text="Submit" handleClick={() => {}} />
      </div>
    </form>
  )
}
