import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useMockupGenerator } from '../useMockupGenerator'
import { supabase } from '../../test/mocks/supabase'

describe('useMockupGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts in idle state', () => {
    const { result } = renderHook(() => useMockupGenerator())
    expect(result.current.status).toBe('idle')
    expect(result.current.mockupUrls).toEqual([])
  })

  it('creates a mockup task and polls until completed', async () => {
    supabase.functions.invoke
      .mockResolvedValueOnce({
        data: { task_key: 'task-abc' },
        error: null,
      })
      .mockResolvedValueOnce({
        data: { status: 'pending' },
        error: null,
      })
      .mockResolvedValueOnce({
        data: {
          status: 'completed',
          mockups: [
            { mockup_url: 'https://mockup1.jpg' },
            { mockup_url: 'https://mockup2.jpg' },
          ],
        },
        error: null,
      })

    const { result } = renderHook(() => useMockupGenerator())

    await act(async () => {
      result.current.generate({
        productId: 71,
        variantIds: [4011],
        placement: 'front',
        imageUrl: 'https://example.com/design.png',
      })
    })

    expect(result.current.status).toBe('generating')

    // First poll - pending
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(result.current.status).toBe('generating')

    // Second poll - completed
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(result.current.status).toBe('completed')
    expect(result.current.mockupUrls).toEqual(['https://mockup1.jpg', 'https://mockup2.jpg'])
  })

  it('handles task creation error', async () => {
    supabase.functions.invoke.mockResolvedValueOnce({
      data: null,
      error: { message: 'Failed to create task' },
    })

    const { result } = renderHook(() => useMockupGenerator())

    await act(async () => {
      result.current.generate({
        productId: 71,
        variantIds: [4011],
        placement: 'front',
        imageUrl: 'https://example.com/design.png',
      })
    })

    expect(result.current.status).toBe('failed')
    expect(result.current.error).toBe('Failed to create task')
  })

  it('cleans up polling on unmount', async () => {
    supabase.functions.invoke
      .mockResolvedValueOnce({
        data: { task_key: 'task-abc' },
        error: null,
      })
      .mockResolvedValue({
        data: { status: 'pending' },
        error: null,
      })

    const { result, unmount } = renderHook(() => useMockupGenerator())

    await act(async () => {
      result.current.generate({
        productId: 71,
        variantIds: [4011],
        placement: 'front',
        imageUrl: 'https://example.com/design.png',
      })
    })

    unmount()

    // Should not throw after unmount
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })
  })
})
