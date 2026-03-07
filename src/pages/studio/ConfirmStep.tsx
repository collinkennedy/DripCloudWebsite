import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import StudioTopBar from '../../components/studio/StudioTopBar'
import PricingSummary from '../../components/studio/PricingSummary'

interface ConfirmStepProps {
  mockupUrls: string[]
  productTitle: string
  baseCost: number
  title: string
  description: string
  retailPrice: number
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
  onRetailPriceChange: (price: number) => void
  onCreateProduct: () => void
  onBack: () => void
  creating: boolean
}

export default function ConfirmStep({
  mockupUrls,
  productTitle,
  baseCost,
  title,
  description,
  retailPrice,
  onTitleChange,
  onDescriptionChange,
  onRetailPriceChange,
  onCreateProduct,
  onBack,
  creating,
}: ConfirmStepProps) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div data-testid="confirm-step" className="flex flex-1 flex-col">
      <StudioTopBar currentStep="CONFIRM" />
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Mockup Gallery */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto bg-gray-50 p-6">
          {mockupUrls.length > 0 && (
            <>
              <div className="max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white">
                <img
                  src={mockupUrls[activeImage]}
                  alt={`Mockup ${activeImage + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
              {mockupUrls.length > 1 && (
                <div className="flex gap-2">
                  {mockupUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                        i === activeImage ? 'border-[#6B2D8B]' : 'border-gray-200'
                      }`}
                    >
                      <img src={url} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Form */}
        <div className="w-96 flex-shrink-0 space-y-4 overflow-y-auto border-l border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>

          <div>
            <label htmlFor="product-title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="product-title"
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={productTitle}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6B2D8B] focus:outline-none focus:ring-1 focus:ring-[#6B2D8B]"
            />
          </div>

          <div>
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="product-description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Describe your product..."
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6B2D8B] focus:outline-none focus:ring-1 focus:ring-[#6B2D8B]"
            />
          </div>

          <div>
            <label htmlFor="retail-price" className="block text-sm font-medium text-gray-700">Retail Price ($)</label>
            <input
              id="retail-price"
              type="number"
              value={retailPrice}
              onChange={(e) => onRetailPriceChange(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6B2D8B] focus:outline-none focus:ring-1 focus:ring-[#6B2D8B]"
            />
          </div>

          <PricingSummary retailPrice={retailPrice} baseCost={baseCost} />

          <button
            onClick={onCreateProduct}
            disabled={creating || !title.trim()}
            className="w-full rounded-lg bg-[#6B2D8B] py-3 text-sm font-medium text-white hover:bg-[#5a2576] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center border-t border-gray-200 bg-white px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </div>
  )
}
