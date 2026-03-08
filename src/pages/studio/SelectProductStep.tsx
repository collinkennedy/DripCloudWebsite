import { useState, useMemo } from 'react'
import { useCatalog } from '../../hooks/useCatalog'
import { useCatalogProduct } from '../../hooks/useCatalogProduct'
import CatalogProductCard from '../../components/studio/CatalogProductCard'
import VariantSelector from '../../components/studio/VariantSelector'
import ProductPreviewPanel from '../../components/studio/ProductPreviewPanel'
import SelectionBar from '../../components/studio/SelectionBar'
import type { CatalogProduct, CatalogColor } from '../../types/catalog'

interface SelectProductStepProps {
  selectedProduct: CatalogProduct | null
  selectedColors: CatalogColor[]
  selectedSizes: string[]
  onSelectProduct: (product: CatalogProduct) => void
  onColorToggle: (color: CatalogColor) => void
  onSizeToggle: (size: string) => void
  onContinue: (variantIds: number[]) => void
}

export default function SelectProductStep({
  selectedProduct,
  selectedColors,
  selectedSizes,
  onSelectProduct,
  onColorToggle,
  onSizeToggle,
  onContinue,
}: SelectProductStepProps) {
  const { products, categories, loading, error } = useCatalog()
  const { variants } = useCatalogProduct(selectedProduct?.id ?? null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products
    return products.filter((p) => p.type_name === activeCategory)
  }, [products, activeCategory])

  // Show variant image for the first selected color, fallback to product image
  const previewImage = useMemo(() => {
    if (selectedColors.length > 0 && variants.length > 0) {
      const match = variants.find((v) => v.color_code === selectedColors[0].color_code)
      if (match?.image) return match.image
    }
    return selectedProduct?.image ?? ''
  }, [selectedProduct, selectedColors, variants])

  const canContinue = selectedProduct !== null && selectedColors.length > 0 && selectedSizes.length > 0

  const resolvedVariantIds = useMemo(() => {
    if (!selectedColors.length || !selectedSizes.length) return []
    const colorCodes = new Set(selectedColors.map((c) => c.color_code))
    const sizeSet = new Set(selectedSizes)
    return variants
      .filter((v) => colorCodes.has(v.color_code) && sizeSet.has(v.size))
      .map((v) => v.id)
  }, [variants, selectedColors, selectedSizes])

  if (loading) {
    return (
      <div data-testid="select-product-step" className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B2D8B]" />
      </div>
    )
  }

  if (error) {
    return (
      <div data-testid="select-product-step" className="flex flex-1 items-center justify-center">
        <p className="text-red-600">Failed to load catalog: {error}</p>
      </div>
    )
  }

  return (
    <div data-testid="select-product-step" className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Catalog Grid */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-gray-900">Choose a Product</h2>
          <p className="mt-1 text-sm text-gray-500">Select a base product for your design</p>

          {/* Category tabs */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveCategory(null)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
                !activeCategory
                  ? 'bg-[#6B2D8B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
                  activeCategory === cat
                    ? 'bg-[#6B2D8B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <CatalogProductCard
                key={product.id}
                product={product}
                selected={selectedProduct?.id === product.id}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>

        {/* Right: Preview + Variants */}
        {selectedProduct && (
          <div className="w-80 flex-shrink-0 space-y-4 overflow-y-auto border-l border-gray-200 bg-white p-6">
            <ProductPreviewPanel
              imageUrl={previewImage}
              title={selectedProduct.title}
            />
            {variants.length > 0 && (
              <VariantSelector
                variants={variants}
                selectedColors={selectedColors}
                selectedSizes={selectedSizes}
                onColorToggle={onColorToggle}
                onSizeToggle={onSizeToggle}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      {selectedProduct && (
        <SelectionBar
          productName={selectedProduct.title}
          colorCount={selectedColors.length}
          sizeCount={selectedSizes.length}
          onContinue={() => onContinue(resolvedVariantIds)}
          disabled={!canContinue}
        />
      )}
    </div>
  )
}
