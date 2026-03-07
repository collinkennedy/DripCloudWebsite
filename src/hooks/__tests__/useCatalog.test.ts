import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCatalog } from '../useCatalog'
import { supabase } from '../../test/mocks/supabase'

const mockProducts = [
  { id: 1, type_name: 'T-Shirt', title: 'Unisex Staple T-Shirt', image: 'img1.jpg', min_price: 12.95 },
  { id: 2, type_name: 'Hoodie', title: 'Unisex Heavy Blend Hoodie', image: 'img2.jpg', min_price: 24.95 },
  { id: 3, type_name: 'T-Shirt', title: 'Unisex Softstyle T-Shirt', image: 'img3.jpg', min_price: 10.95 },
]

describe('useCatalog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    supabase.functions.invoke.mockResolvedValue({ data: [], error: null })
    const { result } = renderHook(() => useCatalog())
    expect(result.current.loading).toBe(true)
  })

  it('fetches catalog products', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: mockProducts, error: null })
    const { result } = renderHook(() => useCatalog())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.products).toEqual(mockProducts)
    expect(supabase.functions.invoke).toHaveBeenCalledWith('printful-catalog', { body: {} })
  })

  it('extracts unique categories', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: mockProducts, error: null })
    const { result } = renderHook(() => useCatalog())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.categories).toEqual(['T-Shirt', 'Hoodie'])
  })

  it('handles errors', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: null, error: { message: 'Network error' } })
    const { result } = renderHook(() => useCatalog())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Network error')
  })
})
