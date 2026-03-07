import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.functions.invoke('printful-products')
      if (error) {
        setError(error.message)
      } else {
        setProducts(data ?? [])
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return { products, loading, error }
}
