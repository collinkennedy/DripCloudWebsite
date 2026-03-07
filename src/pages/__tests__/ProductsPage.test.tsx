import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProductsPage from '../ProductsPage'
import { supabase } from '../../test/mocks/supabase'

function renderPage() {
  return render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>
  )
}

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders page heading', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: [], error: null })
    renderPage()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('renders filter tabs', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: [], error: null })
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/All Products/)).toBeInTheDocument()
    })
    expect(screen.getByText(/^Live/)).toBeInTheDocument()
    expect(screen.getByText(/^Draft/)).toBeInTheDocument()
    expect(screen.getByText(/^In Review/)).toBeInTheDocument()
  })

  it('shows empty state when no products', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: [], error: null })
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/No products yet/)).toBeInTheDocument()
    })
  })

  it('renders product cards when products exist', async () => {
    const products = [
      {
        id: '1',
        title: 'Cool Tee',
        status: 'live',
        retail_price: 29.99,
        base_cost: 12.5,
        mockup_urls: [],
      },
    ]
    supabase.functions.invoke.mockResolvedValue({ data: products, error: null })
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Cool Tee')).toBeInTheDocument()
    })
  })
})
