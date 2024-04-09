'use client'
import Input from '@/components/forms/add-a-deal/Input'
import CategorySelect from '@/components/forms/add-a-deal/CategorySelect'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'
import { deleteImage } from '@/lib/imageUpload'
import toast from 'react-hot-toast'

export default function ProductInfo() {
  const {
    currentStep,
    setCurrentStep,
    newDealData,
    updateNewDealDetails,
    dataLoaded,
  } = useAddDealContext()
  const router = useRouter()

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
    router.push(`/deals/add/${AddDealRoutes.COUPON_DETAILS}`)
  }

  const handleImage = async (file: any) => {
    const { id, uploadUrl, url } = await fetch('/api/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
        mediaType: file.type,
      }),
    }).then((res) => res.json())

    if (!uploadUrl) {
      toast.error('Failed to create image record')
      throw new Error("Couldn't create image record")
    }

    try {
      const data = await fetch(uploadUrl, { method: 'PUT', body: file })
      if (!data.ok) {
        throw new Error('Failed to upload image')
      }

      console.log(data)

      updateNewDealDetails({
        coverImageId: id,
        coverImageURL: url,
      })
    } catch (error) {
      // Delete the record if the upload fails
      await deleteImage(id)
      toast.error("Couldn't upload image")
    }
  }

  return (
    <form onSubmit={nextStep} className="flex flex-1 flex-col items-center">
      <div className="flex flex-col gap-14 md:w-full md:max-w-[700px]">
        <Input
          label="Product Name *"
          value={newDealData?.productName}
          onChange={(e) => {
            console.log(e.target.value)
            updateNewDealDetails({ productName: e.target.value })
          }}
        />
        <CategorySelect
          value={newDealData?.category}
          onCategoryChange={(category) => {
            if (dataLoaded) {
              updateNewDealDetails({ category: category })
            }
          }}
        />
        <Input
          label="Website URL *"
          value={newDealData?.url}
          required={false}
          onChange={(e) => updateNewDealDetails({ url: e.target.value })}
        />
        <Textarea
          label="Product Summary *"
          value={newDealData?.summary}
          onChange={(e) => updateNewDealDetails({ summary: e.target.value })}
        />
        <DragAndDropImage
          onFileChange={(file) => {
            handleImage(file)
          }}
          handleDelete={() => {
            deleteImage(newDealData.coverImageId)
            updateNewDealDetails({ coverImageId: '', coverImageURL: '' })
          }}
        />
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
