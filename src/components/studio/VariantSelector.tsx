import { useMemo } from 'react'
import type { CatalogVariant, CatalogColor } from '../../types/catalog'

interface VariantSelectorProps {
  variants: CatalogVariant[]
  selectedColors: CatalogColor[]
  selectedSizes: string[]
  onColorToggle: (color: CatalogColor) => void
  onSizeToggle: (size: string) => void
}

export default function VariantSelector({
  variants,
  selectedColors,
  selectedSizes,
  onColorToggle,
  onSizeToggle,
}: VariantSelectorProps) {
  const colors = useMemo(() => {
    const seen = new Set<string>()
    return variants
      .filter((v) => {
        if (seen.has(v.color_code)) return false
        seen.add(v.color_code)
        return true
      })
      .map((v) => ({ color_code: v.color_code, color_name: v.color }))
  }, [variants])

  const sizes = useMemo(() => {
    const seen = new Set<string>()
    return variants
      .map((v) => v.size)
      .filter((s) => {
        if (seen.has(s)) return false
        seen.add(s)
        return true
      })
  }, [variants])

  const selectedColorCodes = new Set(selectedColors.map((c) => c.color_code))
  const selectedSizeSet = new Set(selectedSizes)

  return (
    <div data-testid="variant-selector" className="space-y-4">
      {/* Colors */}
      <div>
        <h4 className="text-sm font-medium text-gray-700">Colors</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.color_code}
              title={color.color_name}
              onClick={() => onColorToggle(color)}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                selectedColorCodes.has(color.color_code)
                  ? 'border-[#6B2D8B] ring-2 ring-[#6B2D8B] ring-offset-1'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.color_code }}
              aria-label={color.color_name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-sm font-medium text-gray-700">Sizes</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeToggle(size)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedSizeSet.has(size)
                  ? 'border-[#6B2D8B] bg-purple-50 text-[#6B2D8B]'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
