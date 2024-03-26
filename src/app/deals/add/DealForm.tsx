'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import StepNavigation from '@/components/forms/add-a-deal/StepNavigation'
import Icon from '@/components/Icon'
import Input from '@/components/forms/add-a-deal/Input'
import CategorySelect from '@/components/forms/CategorySelect'
import Textarea from '@/components/forms/add-a-deal/TextArea'
import DragAndDropImage from '@/components/forms/add-a-deal/DragAndDropImage'

const steps = [
  { id: 1, title: 'Product Info' },
  { id: 2, title: 'Coupon Details' },
  { id: 3, title: 'Contact Info' },
  { id: 4, title: 'Review Deals' },
]

export default function DealForm() {
  const [currentStep, setCurrentStep] = useState(4)

  return (
    <div className="mb-28 flex text-white ">
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* step content */}
      <form className="flex flex-1 flex-col items-center">
        {/* step 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-14 md:w-full md:max-w-[700px]">
            <Input label="Product Name *" />
            <CategorySelect />
            <Input label="Website URL *" />
            <Textarea label="Product Summary *" />
            <DragAndDropImage />
            <button
              type="button"
              className="rounded-lg bg-teal-600 py-7 text-2xl text-black -mt-8"
              aria-label="Click to continue"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Continue
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
