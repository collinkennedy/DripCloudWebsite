import { useEffect, useState, useMemo } from 'react'
import { supabase } from '../lib/supabase'
import type { CatalogProduct } from '../types/catalog'

export function useCatalog() {
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const { data, error } = await supabase.functions.invoke('printful-catalog', {
          body: {},
        })
        if (error) {
          setError(error.message)
        } else {
          setProducts(data ?? [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load catalog')
      }
      setLoading(false)
    }
    fetchCatalog()
  }, [])

  const categories = useMemo(() => {
    const seen = new Set<string>()
    return products
      .map((p) => p.type_name)
      .filter((name) => {
        if (seen.has(name)) return false
        seen.add(name)
        return true
      })
  }, [products])

  return { products, categories, loading, error }
}
