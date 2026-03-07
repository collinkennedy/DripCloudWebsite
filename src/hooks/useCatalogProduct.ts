import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { CatalogVariant } from '../types/catalog'

interface ProductDetail {
  id: number
  title: string
  image: string
}

export function useCatalogProduct(productId: number | null) {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [variants, setVariants] = useState<CatalogVariant[]>([])
  const [loading, setLoading] = useState(productId !== null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (productId === null) return

    setLoading(true)
    setError(null)

    async function fetchProduct() {
      try {
        const { data, error } = await supabase.functions.invoke('printful-catalog', {
          body: { product_id: productId },
        })
        if (error) {
          setError(error.message)
        } else {
          setProduct(data?.product ?? null)
          setVariants(data?.variants ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      }
      setLoading(false)
    }
    fetchProduct()
  }, [productId])

  return { product, variants, loading, error }
}
