import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
  variant?: 'summary' | 'full'
}

const statusConfig = {
  live: { label: 'LIVE', className: 'bg-green-100 text-green-800' },
  draft: { label: 'DRAFT', className: 'bg-yellow-100 text-yellow-800' },
  in_review: { label: 'IN REVIEW', className: 'bg-purple-100 text-purple-800' },
  archived: { label: 'ARCHIVED', className: 'bg-gray-100 text-gray-800' },
}

const actionLabels: Record<Product['status'], string> = {
  live: 'View in Store',
  draft: 'Resume Editing',
  in_review: 'Awaiting Approval',
  archived: 'View Details',
}

export default function ProductCard({ product, variant = 'summary' }: ProductCardProps) {
  const status = statusConfig[product.status]
  const profit = (product.retail_price - product.base_cost).toFixed(2)
  const imageUrl = product.mockup_urls[0]

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative aspect-square bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
        <span
          className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            ${product.retail_price.toFixed(2)}
          </span>
          {variant === 'full' && (
            <span className="text-xs text-gray-500">${profit} profit</span>
          )}
        </div>
        {variant === 'full' && (
          <Link
            to="#"
            className="mt-3 block rounded-lg bg-gray-100 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            {actionLabels[product.status]}
          </Link>
        )}
      </div>
    </div>
  )
}
