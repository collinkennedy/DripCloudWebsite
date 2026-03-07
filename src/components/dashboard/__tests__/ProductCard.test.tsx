import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'
import type { Product } from '../../../types/product'

const mockProduct: Product = {
  id: '1',
  merchant_id: 'merchant-1',
  printful_sync_id: 123,
  printful_variant_ids: [1, 2],
  title: 'Classic T-Shirt',
  description: 'A classic tee',
  retail_price: 29.99,
  base_cost: 12.5,
  status: 'live',
  mockup_urls: ['https://example.com/mockup.png'],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductCard', () => {
  it('renders product title', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Classic T-Shirt')).toBeInTheDocument()
  })

  it('renders retail price', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders LIVE status badge for live products', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('renders DRAFT status badge for draft products', () => {
    const draftProduct = { ...mockProduct, status: 'draft' as const }
    renderWithRouter(<ProductCard product={draftProduct} />)
    expect(screen.getByText('DRAFT')).toBeInTheDocument()
  })

  it('renders IN REVIEW status badge', () => {
    const reviewProduct = { ...mockProduct, status: 'in_review' as const }
    renderWithRouter(<ProductCard product={reviewProduct} />)
    expect(screen.getByText('IN REVIEW')).toBeInTheDocument()
  })

  it('shows profit amount', () => {
    renderWithRouter(<ProductCard product={mockProduct} variant="full" />)
    expect(screen.getByText('$17.49 profit')).toBeInTheDocument()
  })
})
