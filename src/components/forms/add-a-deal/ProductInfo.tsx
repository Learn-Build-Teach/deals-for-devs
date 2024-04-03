'use client'
import Input from '@/components/forms/add-a-deal/Input'
import CategorySelect from '@/components/forms/add-a-deal/CategorySelect'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'
import { useRouter } from 'next/navigation'
import { useAddDealContext } from '@/context/AddDealContext'
import { AddDealRoutes } from '@/types/Types'

export default function ProductInfo() {
  const { currentStep, setCurrentStep, newDealData, updateNewDealDetails } =
    useAddDealContext()
  const router = useRouter()

  const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
    router.push(`/deals/add/${AddDealRoutes.COUPON_DETAILS}`)
  }

  const createImage = async (file: any) => {
    const newImage = {
      fileName: file.name,
      mediaType: file.type,
    }

    const response = await fetch('http://localhost:3000/api/image', {
      method: 'PUT',
      body: JSON.stringify(newImage),
    })
    console.log(response)
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
            updateNewDealDetails({ category: category })
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
            createImage(file)
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
