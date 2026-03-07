import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCreateProduct } from '../useCreateProduct'
import { supabase } from '../../test/mocks/supabase'

describe('useCreateProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in idle state', () => {
    const { result } = renderHook(() => useCreateProduct())
    expect(result.current.creating).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('creates a product successfully', async () => {
    supabase.functions.invoke.mockResolvedValue({
      data: { id: 'prod-1', title: 'Cool Tee' },
      error: null,
    })

    const { result } = renderHook(() => useCreateProduct())

    let response: unknown
    await act(async () => {
      response = await result.current.create({
        productId: 71,
        variantIds: [4011, 4012],
        title: 'Cool Tee',
        description: 'A cool tee',
        retailPrice: 29.99,
        designFileUrl: 'https://example.com/design.png',
        placement: 'front',
        mockupUrls: ['https://mockup1.jpg'],
      })
    })

    expect(result.current.creating).toBe(false)
    expect(response).toEqual({ id: 'prod-1', title: 'Cool Tee' })
    expect(supabase.functions.invoke).toHaveBeenCalledWith('printful-products', {
      body: {
        product_id: 71,
        variant_ids: [4011, 4012],
        title: 'Cool Tee',
        description: 'A cool tee',
        retail_price: 29.99,
        design_file_url: 'https://example.com/design.png',
        placement: 'front',
        mockup_urls: ['https://mockup1.jpg'],
      },
    })
  })

  it('handles creation error', async () => {
    supabase.functions.invoke.mockResolvedValue({
      data: null,
      error: { message: 'Server error' },
    })

    const { result } = renderHook(() => useCreateProduct())

    await act(async () => {
      await result.current.create({
        productId: 71,
        variantIds: [4011],
        title: 'Cool Tee',
        description: '',
        retailPrice: 29.99,
        designFileUrl: 'https://example.com/design.png',
        placement: 'front',
        mockupUrls: [],
      })
    })

    expect(result.current.error).toBe('Server error')
  })
})
