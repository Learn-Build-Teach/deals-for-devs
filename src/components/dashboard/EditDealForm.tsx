import { Deal } from '@prisma/client'
import React from 'react'
import DragAndDropImage from '../forms/add-a-deal/DragAndDropImage'
import { cn } from '@/lib/utils'
import { ImageUploadStatus } from '@/types/Types'
import { Progress } from '@radix-ui/react-progress'
import { Input } from 'postcss'
import CategorySelect from '../forms/add-a-deal/CategorySelect'
import { Textarea } from '../ui/textarea'

interface EditDealFormProps {
  deal: Deal
}

export default function EditDealForm({ deal }: EditDealFormProps) {
  return (
    <form>
      <div className="flex w-full flex-col gap-7 lg:max-w-[700px] lg:gap-14">
        <Input label="Product Name *" name="name" />
        <CategorySelect
          value={newDealData?.category}
          onCategoryChange={(category) => {
            if (dataLoaded) {
              updateNewDealDetails({ category: category })
            }
          }}
        />
        <Input
          label="Website URL*"
          placeholder="https://example.com"
          name="url"
        />
        <Textarea label="Product Description *" name="description" />

        <div className="flex flex-col gap-4">
          <span className="text-base font-extralight md:text-2xl">
            Cover Image
          </span>
          {newDealData.coverImageURL ?
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={newDealData.coverImageURL}
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
          }
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:-mt-4 lg:py-7 lg:text-2xl"
          aria-label="Click to continue"
          disabled={imageUploadStatus === ImageUploadStatus.UPLOADING}
        >
          Continue
        </button>
      </div>
    </form>
  )
}
