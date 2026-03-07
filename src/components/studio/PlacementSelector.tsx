interface PlacementSelectorProps {
  placement: 'front' | 'back'
  onPlacementChange: (placement: 'front' | 'back') => void
}

export default function PlacementSelector({ placement, onPlacementChange }: PlacementSelectorProps) {
  return (
    <div data-testid="placement-selector" className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Placement</h4>
      <div className="flex gap-2">
        <button
          onClick={() => onPlacementChange('front')}
          className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${
            placement === 'front'
              ? 'border-[#6B2D8B] bg-purple-50 text-[#6B2D8B]'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Front
        </button>
        <button
          onClick={() => onPlacementChange('back')}
          className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${
            placement === 'back'
              ? 'border-[#6B2D8B] bg-purple-50 text-[#6B2D8B]'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          Back
        </button>
      </div>
    </div>
  )
}
