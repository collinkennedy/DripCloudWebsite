import { useState, useRef, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type MockupStatus = 'idle' | 'generating' | 'completed' | 'failed'

interface GenerateParams {
  productId: number
  variantIds: number[]
  placement: string
  imageUrl: string
}

const POLL_INTERVAL = 3000
const MAX_ATTEMPTS = 20

export function useMockupGenerator() {
  const [status, setStatus] = useState<MockupStatus>('idle')
  const [mockupUrls, setMockupUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const poll = useCallback((taskKey: string, attempts: number) => {
    if (!mountedRef.current) return

    if (attempts >= MAX_ATTEMPTS) {
      setStatus('failed')
      setError('Mockup generation timed out')
      return
    }

    timerRef.current = setTimeout(async () => {
      if (!mountedRef.current) return

      const { data: pollData } = await supabase.functions.invoke('printful-mockups', {
        body: { action: 'check', task_key: taskKey },
      })

      if (!mountedRef.current) return

      if (pollData?.status === 'completed') {
        const urls = (pollData.mockups ?? []).map((m: { mockup_url: string }) => m.mockup_url)
        setMockupUrls(urls)
        setStatus('completed')
      } else if (pollData?.status === 'failed') {
        setStatus('failed')
        setError('Mockup generation failed')
      } else {
        poll(taskKey, attempts + 1)
      }
    }, POLL_INTERVAL)
  }, [])

  const generate = useCallback(async (params: GenerateParams) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setStatus('generating')
    setError(null)
    setMockupUrls([])

    const { data, error: createError } = await supabase.functions.invoke('printful-mockups', {
      body: {
        product_id: params.productId,
        variant_ids: params.variantIds,
        files: [{ placement: params.placement, image_url: params.imageUrl }],
      },
    })

    if (createError) {
      setStatus('failed')
      setError(createError.message)
      return
    }

    const taskKey = data?.task_key
    if (!taskKey) {
      setStatus('failed')
      setError('No task key returned')
      return
    }

    poll(taskKey, 0)
  }, [poll])

  return { generate, status, mockupUrls, error }
}
