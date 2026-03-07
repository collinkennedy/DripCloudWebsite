import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/dashboard/ProductCard'

type FilterTab = 'all' | 'live' | 'draft' | 'in_review'

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'live', label: 'Live' },
  { key: 'draft', label: 'Draft' },
  { key: 'in_review', label: 'In Review' },
]

export default function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((p) => p.status === activeTab)

  const counts = {
    all: products.length,
    live: products.filter((p) => p.status === 'live').length,
    draft: products.filter((p) => p.status === 'draft').length,
    in_review: products.filter((p) => p.status === 'in_review').length,
  }

  return (
    <div data-testid="products-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          to="#"
          className="flex items-center gap-2 rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5a2576]"
        >
          <Plus size={16} />
          Design New Merchandise
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label} ({counts[key]})
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B2D8B]" />
        </div>
      ) : error ? (
        <div className="mt-12 text-center text-red-600">
          <p>Failed to load products: {error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
            <Plus size={24} className="text-[#6B2D8B]" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No products yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Design your first piece of merchandise to get started.
          </p>
          <Link
            to="#"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5a2576]"
          >
            <Plus size={16} />
            Design New Merchandise
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="full" />
          ))}
        </div>
      )}
    </div>
  )
}
