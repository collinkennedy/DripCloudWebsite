import type { CatalogProduct } from '../../types/catalog'

interface CatalogProductCardProps {
  product: CatalogProduct
  selected: boolean
  onSelect: (product: CatalogProduct) => void
}

export default function CatalogProductCard({ product, selected, onSelect }: CatalogProductCardProps) {
  return (
    <button
      data-testid={`catalog-card-${product.id}`}
      onClick={() => onSelect(product)}
      className={`group rounded-xl border-2 bg-white p-4 text-left transition-all hover:shadow-md ${
        selected ? 'border-[#6B2D8B] shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-2"
        />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-gray-900 line-clamp-2">
        {product.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500">{product.type_name}</p>
      {product.min_price != null && (
        <p className="mt-1 text-sm font-medium text-gray-900">
          From ${product.min_price.toFixed(2)}
        </p>
      )}
    </button>
  )
}
