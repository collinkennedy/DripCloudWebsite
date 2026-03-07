import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProducts } from '../useProducts'
import { supabase } from '../../test/mocks/supabase'

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    supabase.functions.invoke.mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => useProducts())
    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('fetches products successfully', async () => {
    const mockProducts = [
      { id: '1', title: 'T-Shirt', status: 'live', retail_price: 29.99 },
      { id: '2', title: 'Hoodie', status: 'draft', retail_price: 49.99 },
    ]
    supabase.functions.invoke.mockResolvedValue({
      data: mockProducts,
      error: null,
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
    expect(supabase.functions.invoke).toHaveBeenCalledWith('printful-products')
  })

  it('handles fetch error', async () => {
    supabase.functions.invoke.mockResolvedValue({
      data: null,
      error: { message: 'Unauthorized' },
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual([])
    expect(result.current.error).toBe('Unauthorized')
  })
})
