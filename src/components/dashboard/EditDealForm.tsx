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
import { set } from 'date-fns'

interface EditDealFormProps {
  deal: Deal
}

export default function EditDealForm({ deal }: EditDealFormProps) {
  const [updatedDeal, setUpdatedDeal] = useState<Deal>(deal)

  const [blurs, setBlurs] = useState<FormBlurs>({})
  const [errors, setErrors] = useState<FormErrors>({})

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { successMessage, error } = await updateDealAction(updatedDeal)
    if (successMessage) {
      toast.success('Deal updated successfully')
    } else if (error) {
      toast.error(error)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedDeal((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
        <Input
          label="Product Name *"
          name="name"
          value={updatedDeal.name}
          onChange={handleInputChange}
        />
        <CategorySelect
          value={updatedDeal.category}
          onCategoryChange={(category) => {
            setUpdatedDeal((prev) => ({ ...prev, category: category }))
          }}
        />
        <input type="hidden" name="category" value={updatedDeal.category} />
        <Input
          label="Website URL*"
          name="link"
          value={updatedDeal.link}
          onChange={handleInputChange}
        />
        <Textarea
          label="Product Description *"
          name="description"
          value={updatedDeal.description}
          onChange={handleInputChange}
        />

        <div className="flex flex-col gap-4">
          {/* 
          <span className="text-base font-extralight md:text-2xl">
            Cover Image
          </span>
          {deal.coverImageURL ?
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
                  if (date === undefined) {
                    date = new Date()
                  }
                  setUpdatedDeal((prev) => ({
                    ...prev,
                    startDate: date,
                  }))
                }}
                initialDate={new Date(deal.startDate)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base font-extralight md:text-2xl">
                End date
              </span>
              <DatePicker
                onDateChange={(date: Date | undefined) => {
                  setUpdatedDeal((prev) => ({
                    ...prev,
                    endDate: date || null,
                  }))
                }}
                initialDate={deal.endDate ? new Date(deal.endDate) : undefined}
              />
            </div>
          </div>
          <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
            <Input
              label="Coupon Code"
              name="coupon"
              value={updatedDeal.coupon || undefined}
              onBlur={() => setBlurs({ ...blurs, coupon: true })}
              required={false}
              error={blurs.coupon ? errors.coupon : undefined}
              onChange={handleInputChange}
            />
            <Input
              label="Discount %"
              name="couponPercent"
              value={updatedDeal.couponPercent || undefined}
              onBlur={() => setBlurs({ ...blurs, couponPercent: true })}
              required={false}
              type="number"
              onChange={(e) => {
                const numValue = Number(e.target.value)
                setUpdatedDeal((prev) => ({
                  ...prev,
                  couponPercent: Number.isNaN(numValue) ? null : numValue,
                }))
              }}
            />
          </div>
          <div className="flex flex-col gap-7">
            <Input
              label="Full Name *"
              name="contactName"
              value={updatedDeal.contactName}
              onBlur={() => setBlurs({ ...blurs, contactName: true })}
              required={true}
              error={blurs.contactName ? errors.contactName : undefined}
              onChange={handleInputChange}
            />
            <Input
              label="Email *"
              name="contactEmail"
              value={updatedDeal.contactEmail}
              onBlur={() => setBlurs({ ...blurs, contactEmail: true })}
              required={true}
              error={blurs.contactEmail ? errors.contactEmail : undefined}
              onChange={handleInputChange}
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
