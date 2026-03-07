const PRINTFUL_API_BASE = 'https://api.printful.com'

/**
 * Makes an authenticated request to the Printful API.
 * The API token is read from the PRINTFUL_API_TOKEN env var (set via Supabase secrets).
 */
export async function printfulFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = Deno.env.get('PRINTFUL_API_TOKEN')
  if (!token) {
    throw new Error('PRINTFUL_API_TOKEN is not set')
  }

  const url = `${PRINTFUL_API_BASE}${path}`
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Helper that calls printfulFetch, checks for errors, and returns parsed JSON.
 */
export async function printfulRequest<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await printfulFetch(path, options)

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Printful API error ${res.status}: ${body}`)
  }

  const json = await res.json()
  return json.result as T
}
