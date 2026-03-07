import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { printfulRequest } from '../_shared/printful.ts'

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let productId: string | null = null
    let categoryId: string | null = null

    if (req.method === 'POST') {
      // supabase.functions.invoke sends POST with JSON body
      try {
        const body = await req.json()
        productId = body.product_id?.toString() ?? null
        categoryId = body.category_id?.toString() ?? null
      } catch (_e) {
        // Empty body is fine — list all products
      }
    } else {
      // Also support GET with query params
      const url = new URL(req.url)
      productId = url.searchParams.get('product_id')
      categoryId = url.searchParams.get('category_id')
    }

    if (productId) {
      // Get a specific product with its variants
      const product = await printfulRequest(`/products/${productId}`)
      return new Response(JSON.stringify(product), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // List all catalog products
    // Optional filter by category_id
    const path = categoryId
      ? `/products?category_id=${categoryId}`
      : '/products'

    const products = await printfulRequest(path)
    return new Response(JSON.stringify(products), {
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
