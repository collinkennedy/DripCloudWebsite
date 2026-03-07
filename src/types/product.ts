export interface Product {
  id: string
  merchant_id: string
  printful_sync_id: number | null
  printful_variant_ids: number[]
  title: string
  description: string | null
  retail_price: number
  base_cost: number
  status: 'draft' | 'live' | 'in_review' | 'archived'
  mockup_urls: string[]
  created_at: string
  updated_at: string
}
