import { Check } from 'lucide-react'
import type { WizardStep } from '../../types/catalog'

const steps: { key: WizardStep; label: string }[] = [
  { key: 'PRODUCT', label: 'Product' },
  { key: 'DESIGN', label: 'Design' },
  { key: 'CONFIRM', label: 'Confirm' },
]

const stepOrder: WizardStep[] = ['PRODUCT', 'DESIGN', 'CONFIRM']

interface StudioProgressProps {
  currentStep: WizardStep
}

export default function StudioProgress({ currentStep }: StudioProgressProps) {
  const currentIndex = stepOrder.indexOf(currentStep)

  return (
    <div data-testid="studio-progress" className="flex items-center gap-2">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex
        const isCurrent = i === currentIndex

        return (
          <div key={step.key} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`h-px w-8 ${isCompleted ? 'bg-[#6B2D8B]' : 'bg-gray-300'}`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  isCompleted
                    ? 'bg-[#6B2D8B] text-white'
                    : isCurrent
                      ? 'border-2 border-[#6B2D8B] text-[#6B2D8B]'
                      : 'border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCurrent ? 'text-[#6B2D8B]' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
