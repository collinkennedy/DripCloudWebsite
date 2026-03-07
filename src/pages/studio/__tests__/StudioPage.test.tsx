import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import StudioPage from '../StudioPage'
import { supabase } from '../../../test/mocks/supabase'

const mockProducts = [
  { id: 71, type_name: 'T-Shirt', title: 'Staple Tee', description: '', image: 'tee.jpg', variant_count: 50, currency: 'USD', min_price: 12.95 },
]

describe('StudioPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    supabase.functions.invoke.mockResolvedValue({ data: mockProducts, error: null })
  })

  it('renders step 1 (select product) by default', async () => {
    render(
      <MemoryRouter>
        <StudioPage />
      </MemoryRouter>
    )
    expect(screen.getByTestId('studio-page')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByTestId('select-product-step')).toBeInTheDocument()
    })
  })

  it('shows product step with progress indicator', async () => {
    render(
      <MemoryRouter>
        <StudioPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByTestId('studio-progress')).toBeInTheDocument()
    })
    expect(screen.getByText('Product')).toHaveClass('text-[#6B2D8B]')
  })
})
