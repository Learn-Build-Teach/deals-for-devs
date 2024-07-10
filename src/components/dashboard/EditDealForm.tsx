'use client'
import { Deal } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Category } from '@/types/Types'
import CategorySelect from '../forms/add-a-deal/CategorySelect'
import Input from '../forms/add-a-deal/Input'
import Textarea from '../forms/add-a-deal/TextArea'
import { FormBlurs, FormErrors } from '@/app/deals/add/types'
import { DatePicker } from '../forms/DatePicker'
import { updateDealAction } from '@/app/admin/dashboard/actions'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

interface EditDealFormProps {
  deal: Deal
}
const initialState = {
  error: undefined,
  success: false,
}

export default function EditDealForm({ deal }: EditDealFormProps) {
  const [category, setCategory] = useState<Category>(deal.category as Category)
  const [startDate, setStartDate] = useState<string | undefined>(
    deal.startDate.toISOString()
  )
  const [endDate, setEndDate] = useState<string | undefined>(
    deal.endDate?.toISOString() || undefined
  )
  const [blurs, setBlurs] = useState<FormBlurs>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [name, setName] = useState<string>(deal.name)
  const [description, setDescription] = useState<string>(deal.description)
  const [coupon, setCoupon] = useState<string>(deal.coupon || '')
  const [couponPercent, setCouponPercent] = useState<number | null>(
    deal.couponPercent
  )
  const [contactName, setContactName] = useState<string>(deal.contactName)
  const [contactEmail, setContactEmail] = useState<string>(deal.contactEmail)
  const [link, setLink] = useState<string>(deal.link)

  const [{ error, success }, formAction] = useFormState(
    updateDealAction,
    initialState
  )

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      toast.success('Deal updated successfully')
    }
  }, [success])

  return (
    <form action={formAction}>
      <input type="hidden" value={deal.xata_id} name="xata_id" />
      <input
        type="hidden"
        value={deal.xata_createdat.toISOString()}
        name="xata_createdat"
      />
      <input
        type="hidden"
        value={deal.xata_updatedat.toISOString()}
        name="xata_updatedat"
      />
      <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
        <Input
          label="Product Name *"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <CategorySelect
          value={category}
          onCategoryChange={(category) => {
            setCategory(category)
          }}
        />
        <input type="hidden" name="category" value={category} />
        <Input
          label="Website URL*"
          placeholder="https://example.com"
          name="link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value)
          }}
        />
        <Textarea
          label="Product Description *"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />

        <div className="flex flex-col gap-4">
          <span className="text-base font-extralight md:text-2xl">
            Cover Image
          </span>
          {/* {deal.coverImageURL ?
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={deal.coverImageURL}
                alt="Product Image"
                width={1280}
                height={720}
                className="absolute bottom-0 left-0 right-0 top-0 aspect-video w-full object-cover"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-black bg-opacity-50 px-3.5 py-1.5 text-white hover:bg-teal-500"
              >
                X
              </button>
            </div>
          : <>
              <DragAndDropImage
                onFileChange={(file) => {
                  handleImageUpload(file)
                }}
                handleDelete={handleImageDelete}
              />

              <Progress
                value={imageUploadProgress}
                className={cn(
                  imageUploadStatus === ImageUploadStatus.UPLOADING ?
                    'w-full'
                  : 'hidden'
                )}
              />
            </>
          } */}
        </div>
        <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="text-base font-extralight md:text-2xl">
                Start date*
              </span>
              <DatePicker
                onDateChange={(date: Date | undefined) => {
                  setStartDate(date?.toISOString() || undefined)
                }}
                initialDate={new Date(deal.startDate)}
              />
            </div>
            <input type="hidden" name="startDate" value={startDate} />
            <input type="hidden" name="endDate" value={endDate} />
            <div className="flex flex-col gap-2">
              <span className="text-base font-extralight md:text-2xl">
                End date
              </span>
              <DatePicker
                onDateChange={(date: Date | undefined) => {
                  setEndDate(date?.toISOString() || undefined)
                }}
                initialDate={deal.endDate ? new Date(deal.endDate) : undefined}
              />
            </div>
          </div>
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
            <Input
              label="Coupon Code"
              name="coupon"
              value={coupon}
              onBlur={() => setBlurs({ ...blurs, coupon: true })}
              required={false}
              error={blurs.coupon ? errors.coupon : undefined}
              onChange={(e) => {
                setCoupon(e.target.value)
              }}
            />
            <Input
              label="Discount %"
              name="couponPercent"
              value={couponPercent || undefined}
              onBlur={() => setBlurs({ ...blurs, couponPercent: true })}
              required={false}
              onChange={(e) => {
                setCouponPercent(Number(e.target.value))
              }}
            />
          </div>
          <div className="flex flex-col gap-7">
            <Input
              label="Full Name *"
              name="contactName"
              value={contactName}
              onBlur={() => setBlurs({ ...blurs, contactName: true })}
              required={true}
              error={blurs.contactName ? errors.contactName : undefined}
              onChange={(e) => {
                setContactName(e.target.value)
              }}
            />
            <Input
              label="Email *"
              name="contactEmail"
              value={contactEmail}
              onBlur={() => setBlurs({ ...blurs, contactEmail: true })}
              required={true}
              error={blurs.contactEmail ? errors.contactEmail : undefined}
              onChange={(e) => {
                setContactEmail(e.target.value)
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
        >
          Update
        </button>
      </div>
    </form>
  )
}
