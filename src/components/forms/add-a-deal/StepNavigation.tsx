'use client'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useAddDealContext } from '@/context/AddDealContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AddDealRoutes } from '@/types/Types'
import { usePathname } from 'next/navigation'
import path from 'path'
import { useEffect } from 'react'

const steps = [
  { id: 1, title: 'Product Info', route: AddDealRoutes.PRODUCT_INFO },
  { id: 2, title: 'Coupon Details', route: AddDealRoutes.COUPON_DETAILS },
  { id: 3, title: 'Contact Info', route: AddDealRoutes.CONTACT_INFO },
  { id: 4, title: 'Review Deal', route: AddDealRoutes.REVIEW_DEAL },
]

export default function StepNavigation() {
  const { currentStep, setCurrentStep } = useAddDealContext()
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = path.basename(pathname)

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath) + 1)
  }, [currentPath, setCurrentStep])

  return (
    <div className="mt-4">
      {/* back button */}
      <button
        className="mb-12 flex items-center gap-5 text-xl disabled:text-white/50"
        onClick={() => {
          setCurrentStep(currentStep - 1)
          router.push(`/deals/add/${steps[currentStep - 2].route}`)
        }}
        disabled={currentStep < 2}
      >
        <Icon id="chevron-left" className="h-4 w-2" />
        <span>Back</span>
      </button>

      {/* list of form steps */}
      <div className="flex flex-col gap-8">
        {steps.map((step) => (
          <Link
            href={`/deals/add/${step.route}`}
            key={step.id}
            className="group flex items-center gap-3 text-2xl"
            onClick={() => setCurrentStep(step.id)}
            prefetch={false}
          >
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border border-white/75 text-white/75 transition-colors duration-200 group-hover:border-white group-hover:text-white',
                currentPath === step.route &&
                  'border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black'
              )}
            >
              {step.id}
            </span>
            <span
              className={cn(
                'text-white/75 transition-colors duration-200 group-hover:text-white',
                currentPath === step.route && 'font-semibold text-white'
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
