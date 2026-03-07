import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface CreateProductParams {
  productId: number
  variantIds: number[]
  title: string
  description: string
  retailPrice: number
  designFileUrl: string
  placement: string
  mockupUrls: string[]
}

export function useCreateProduct() {
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function create(params: CreateProductParams) {
    setCreating(true)
    setError(null)

    const { data, error: invokeError } = await supabase.functions.invoke('printful-products', {
      body: {
        product_id: params.productId,
        variant_ids: params.variantIds,
        title: params.title,
        description: params.description,
        retail_price: params.retailPrice,
        design_file_url: params.designFileUrl,
        placement: params.placement,
        mockup_urls: params.mockupUrls,
      },
    })

    if (invokeError) {
      setError(invokeError.message)
      setCreating(false)
      return null
    }

    setCreating(false)
    return data
  }

  return { create, creating, error }
}
