import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFileUpload } from '../useFileUpload'
import { supabase } from '../../test/mocks/supabase'

describe('useFileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    supabase.storage.from.mockReturnValue({
      upload: vi.fn().mockResolvedValue({ data: { path: 'uploads/test.png' }, error: null }),
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://storage.example.com/test.png' } }),
    })
    supabase.functions.invoke.mockResolvedValue({ data: { id: 123, url: 'https://printful.com/file/123' }, error: null })
  })

  it('starts in idle state', () => {
    const { result } = renderHook(() => useFileUpload())
    expect(result.current.uploading).toBe(false)
    expect(result.current.fileUrl).toBeNull()
  })

  it('uploads file to storage then registers with printful-files', async () => {
    const { result } = renderHook(() => useFileUpload())
    const file = new File(['pixels'], 'design.png', { type: 'image/png' })

    await act(async () => {
      await result.current.upload(file)
    })

    expect(supabase.storage.from).toHaveBeenCalledWith('design-files')
    expect(result.current.fileUrl).toBe('https://storage.example.com/test.png')
    expect(result.current.uploading).toBe(false)
  })

  it('handles storage upload error', async () => {
    supabase.storage.from.mockReturnValue({
      upload: vi.fn().mockResolvedValue({ data: null, error: { message: 'Upload failed' } }),
      getPublicUrl: vi.fn(),
    })

    const { result } = renderHook(() => useFileUpload())
    const file = new File(['pixels'], 'design.png', { type: 'image/png' })

    await act(async () => {
      await result.current.upload(file)
    })

    expect(result.current.error).toBe('Upload failed')
    expect(result.current.fileUrl).toBeNull()
  })
})
