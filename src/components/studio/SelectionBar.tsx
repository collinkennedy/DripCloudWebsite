import { ArrowRight } from 'lucide-react'

interface SelectionBarProps {
  productName: string
  colorCount: number
  sizeCount: number
  onContinue: () => void
  disabled: boolean
}

export default function SelectionBar({ productName, colorCount, sizeCount, onContinue, disabled }: SelectionBarProps) {
  return (
    <div data-testid="selection-bar" className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{productName}</span>
          {' · '}
          {colorCount} color{colorCount !== 1 ? 's' : ''}
          {' · '}
          {sizeCount} size{sizeCount !== 1 ? 's' : ''}
        </div>
        <button
          onClick={onContinue}
          disabled={disabled}
          className="flex items-center gap-2 rounded-lg bg-[#6B2D8B] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#5a2576] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Design
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
