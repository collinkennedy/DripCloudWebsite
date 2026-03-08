import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { printfulRequest } from '../_shared/printful.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method === 'POST') {
      const body = await req.json()

      // Check mockup task status (polling via invoke)
      if (body.action === 'check' && body.task_key) {
        const result = await printfulRequest(
          `/mockup-generator/task?task_key=${body.task_key}`
        )
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Create a mockup generation task
      // Body: { product_id: number, variant_ids: number[], files: [{ placement, image_url }] }
      const { product_id, variant_ids, files } = body

      if (!product_id || !files?.length) {
        return new Response(
          JSON.stringify({
            error: 'product_id and files are required',
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      // Fetch printfile info to get dimensions for each placement
      const printfileInfo = await printfulRequest(
        `/mockup-generator/printfiles/${product_id}`
      )

      // Build a map: printfile_id → { width, height }
      const printfileDims: Record<number, { width: number; height: number }> = {}
      for (const pf of printfileInfo.printfiles ?? []) {
        printfileDims[pf.printfile_id] = { width: pf.width, height: pf.height }
      }

      // Find placement → printfile_id mapping from the first matching variant
      const placementToPrintfile: Record<string, number> = {}
      const targetVariantId = variant_ids?.[0]
      for (const vp of printfileInfo.variant_printfiles ?? []) {
        if (!targetVariantId || vp.variant_id === targetVariantId) {
          for (const [placement, pfId] of Object.entries(vp.placements)) {
            placementToPrintfile[placement] = pfId as number
          }
          break
        }
      }

      // Enrich files with position data
      const enrichedFiles = files.map((f: { placement: string; image_url: string }) => {
        const pfId = placementToPrintfile[f.placement]
        const dims = pfId ? printfileDims[pfId] : null
        return {
          ...f,
          position: dims
            ? { area_width: dims.width, area_height: dims.height, width: dims.width, height: dims.height, top: 0, left: 0 }
            : { area_width: 1800, area_height: 1800, width: 1800, height: 1800, top: 0, left: 0 },
        }
      })

      const task = await printfulRequest(
        `/mockup-generator/create-task/${product_id}`,
        {
          method: 'POST',
          body: JSON.stringify({ variant_ids, files: enrichedFiles }),
        }
      )

      return new Response(JSON.stringify(task), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (req.method === 'GET') {
      // Check mockup task status via GET query param
      const url = new URL(req.url)
      const taskKey = url.searchParams.get('task_key')
      if (!taskKey) {
        return new Response(
          JSON.stringify({ error: 'task_key query param is required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      const result = await printfulRequest(
        `/mockup-generator/task?task_key=${taskKey}`
      )

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
