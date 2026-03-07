import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCatalogProduct } from '../useCatalogProduct'
import { supabase } from '../../test/mocks/supabase'

const mockProductDetail = {
  product: { id: 71, title: 'Unisex Staple T-Shirt', image: 'img.jpg' },
  variants: [
    { id: 4011, product_id: 71, name: 'S / Black', size: 'S', color: 'Black', color_code: '#000', price: '12.95', in_stock: true },
    { id: 4012, product_id: 71, name: 'M / Black', size: 'M', color: 'Black', color_code: '#000', price: '12.95', in_stock: true },
  ],
}

describe('useCatalogProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state when product_id is provided', () => {
    supabase.functions.invoke.mockResolvedValue({ data: mockProductDetail, error: null })
    const { result } = renderHook(() => useCatalogProduct(71))
    expect(result.current.loading).toBe(true)
  })

  it('fetches product detail with product_id', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: mockProductDetail, error: null })
    const { result } = renderHook(() => useCatalogProduct(71))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.product).toEqual(mockProductDetail.product)
    expect(result.current.variants).toEqual(mockProductDetail.variants)
    expect(supabase.functions.invoke).toHaveBeenCalledWith('printful-catalog', {
      body: { product_id: 71 },
    })
  })

  it('skips fetch when product_id is null', () => {
    const { result } = renderHook(() => useCatalogProduct(null))
    expect(result.current.loading).toBe(false)
    expect(result.current.product).toBeNull()
    expect(supabase.functions.invoke).not.toHaveBeenCalled()
  })

  it('handles errors', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: null, error: { message: 'Not found' } })
    const { result } = renderHook(() => useCatalogProduct(99))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Not found')
  })
})
