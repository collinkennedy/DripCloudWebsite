import { useState } from 'react'

interface ProductPreviewPanelProps {
  imageUrl: string
  title: string
}

export default function ProductPreviewPanel({ imageUrl, title }: ProductPreviewPanelProps) {
  const [side, setSide] = useState<'front' | 'back'>('front')

  return (
    <div data-testid="product-preview" className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={imageUrl}
          alt={`${title} - ${side}`}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setSide('front')}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium ${
            side === 'front'
              ? 'bg-[#6B2D8B] text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Front
        </button>
        <button
          onClick={() => setSide('back')}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium ${
            side === 'back'
              ? 'bg-[#6B2D8B] text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Back
        </button>
      </div>
    </div>
  )
}
