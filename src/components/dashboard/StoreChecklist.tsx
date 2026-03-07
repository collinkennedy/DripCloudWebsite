import { Check, Circle } from 'lucide-react'

const steps = [
  { label: 'Create your account', completed: true },
  { label: 'Add your first design', completed: false },
  { label: 'Set up your storefront', completed: false },
  { label: 'Make your first sale', completed: false },
]

export default function StoreChecklist() {
  const completedCount = steps.filter((s) => s.completed).length

  return (
    <div data-testid="store-checklist" className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Store Checklist</h3>
        <span className="text-xs text-gray-500">
          {completedCount}/{steps.length} complete
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            {step.completed ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                <Check size={12} className="text-white" />
              </div>
            ) : (
              <Circle size={20} className="text-gray-300" />
            )}
            <span
              className={`text-sm ${
                step.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
