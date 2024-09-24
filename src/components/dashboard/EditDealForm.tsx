'use client'
import React, { useState } from 'react'
import CategorySelect from '../forms/add-a-deal/CategorySelect'
import Input from '../forms/add-a-deal/Input'
import Textarea from '../forms/add-a-deal/TextArea'
import { DatePicker } from '../forms/DatePicker'
import toast from 'react-hot-toast'
import { Progress } from '../ui/progress'
import { cn } from '@/lib/utils'
import DragAndDropImage from '../forms/add-a-deal/DragAndDropImage'
import Image from 'next/image'
import ImageUpload from '@/app/(public-pages)/deals/add/ImageUpload'
import ApprovedSelect from '../forms/add-a-deal/ApprovedSelect'
import CommaSeparatedTags from '../forms/add-a-deal/CommaSeparatedTagsInput'
import TagsList from '../forms/add-a-deal/TagsList'
import FeaturedSelect from '../forms/add-a-deal/FeaturedSelect'
import SubmitButton from './SubmitButton'
import { updateDealAction } from '@/app/(admin)/dashboard/actions'
import { DealWithTags, FormBlurs, FormErrors } from '@/types'

interface EditDealFormProps {
  deal: DealWithTags
}

export default function EditDealForm({ deal }: EditDealFormProps) {
  const [updatedDeal, setUpdatedDeal] = useState<DealWithTags>(deal)
  const [tags, setTags] = useState<{ text: string }[]>(deal.tags)

  const [blurs, setBlurs] = useState<FormBlurs>({})
  const [errors, setErrors] = useState<FormErrors>({})

  const handleFormSubmit = async () => {
    const { successMessage, error } = await updateDealAction(updatedDeal, tags)
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

  const handleImageUpload = (coverImageId: string, coverImageURL: string) => {
    setUpdatedDeal((prev) => ({ ...prev, coverImageId, coverImageURL }))
  }

  const handleImageDeleted = (coverImageId: string) => {
    setUpdatedDeal((prev) => ({ ...prev, coverImageId: '', coverImageURL: '' }))
  }

  const handleTagsUpdated = (tags: { text: string }[]) => {
    setTags(tags)
  }

  return (
    <form action={handleFormSubmit}>
      <div className="flex w-full flex-col gap-7 lg:gap-14">
        <div className="flex flex-col gap-x-4 md:flex-row ">
          <div className=" grow">
            <ApprovedSelect
              value={updatedDeal.approved}
              onApprovedChange={(approvedStr: string) => {
                setUpdatedDeal((prev) => ({
                  ...prev,
                  approved: approvedStr === 'true' ? true : false,
                }))
              }}
            />
          </div>
          <div className=" grow">
            <FeaturedSelect
              value={updatedDeal.featured}
              onFeaturedChange={(featuredStr: string) => {
                setUpdatedDeal((prev) => ({
                  ...prev,
                  featured: featuredStr === 'true' ? true : false,
                }))
              }}
            />
          </div>
        </div>
        <Input
          label="Product Name *"
          name="name"
          value={updatedDeal.name}
          onChange={handleInputChange}
        />
        <CommaSeparatedTags
          handleTagsUpdated={handleTagsUpdated}
          initialTags={tags}
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
        <ImageUpload
          onImageUploaded={handleImageUpload}
          onImageDeleted={handleImageDeleted}
          initialCoverImageId={deal.coverImageId || undefined}
          initialCoverImageURL={deal.coverImageURL || undefined}
        />

        <div className="flex w-full flex-col gap-7 lg:gap-14">
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
        <SubmitButton text="Update" handleClick={() => {}} />
      </div>
    </form>
  )
}
