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

      const task = await printfulRequest(
        `/mockup-generator/create-task/${product_id}`,
        {
          method: 'POST',
          body: JSON.stringify({ variant_ids, files }),
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
