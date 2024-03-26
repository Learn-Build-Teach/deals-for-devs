import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'

type StepNavigationProps = {
  steps: { id: number; title: string }[]
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

export default function StepNavigation({
  steps,
  currentStep,
  setCurrentStep,
}: StepNavigationProps) {
  return (
    <div className="mt-2">
      <button
        className="mb-12 flex items-center gap-5 text-xl disabled:text-white/50"
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 1}
      >
        <Icon id="chevron-left" className="h-4 w-2" />
        <span>Back</span>
      </button>

      <div className="flex flex-col gap-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3 text-2xl">
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border',
                currentStep === step.id && 'border-none bg-teal-500 text-black'
              )}
            >
              {step.id}
            </span>
            <span
              className={cn(
                'text-white/75',
                currentStep === step.id && 'font-semibold text-white'
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
