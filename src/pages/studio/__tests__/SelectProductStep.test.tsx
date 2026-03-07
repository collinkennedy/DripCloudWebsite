import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SelectProductStep from '../SelectProductStep'
import { supabase } from '../../../test/mocks/supabase'

const mockProducts = [
  { id: 71, type_name: 'T-Shirt', title: 'Staple Tee', description: '', image: 'tee.jpg', variant_count: 50, currency: 'USD', min_price: 12.95 },
  { id: 72, type_name: 'Hoodie', title: 'Heavy Hoodie', description: '', image: 'hoodie.jpg', variant_count: 30, currency: 'USD', min_price: 24.95 },
]

describe('SelectProductStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    supabase.functions.invoke.mockResolvedValue({ data: mockProducts, error: null })
  })

  it('renders category tabs', async () => {
    render(
      <SelectProductStep
        selectedProduct={null}
        selectedColors={[]}
        selectedSizes={[]}
        onSelectProduct={vi.fn()}
        onColorToggle={vi.fn()}
        onSizeToggle={vi.fn()}
        onContinue={vi.fn()}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('All')).toBeInTheDocument()
    })
    // Category names appear both as tabs and as product type labels
    expect(screen.getAllByText('T-Shirt').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Hoodie').length).toBeGreaterThanOrEqual(1)
  })

  it('renders product cards', async () => {
    render(
      <SelectProductStep
        selectedProduct={null}
        selectedColors={[]}
        selectedSizes={[]}
        onSelectProduct={vi.fn()}
        onColorToggle={vi.fn()}
        onSizeToggle={vi.fn()}
        onContinue={vi.fn()}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('Staple Tee')).toBeInTheDocument()
    })
    expect(screen.getByText('Heavy Hoodie')).toBeInTheDocument()
  })

  it('calls onSelectProduct when a card is clicked', async () => {
    const onSelectProduct = vi.fn()
    render(
      <SelectProductStep
        selectedProduct={null}
        selectedColors={[]}
        selectedSizes={[]}
        onSelectProduct={onSelectProduct}
        onColorToggle={vi.fn()}
        onSizeToggle={vi.fn()}
        onContinue={vi.fn()}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('Staple Tee')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('catalog-card-71'))
    expect(onSelectProduct).toHaveBeenCalledWith(mockProducts[0])
  })

  it('filters products by category', async () => {
    render(
      <SelectProductStep
        selectedProduct={null}
        selectedColors={[]}
        selectedSizes={[]}
        onSelectProduct={vi.fn()}
        onColorToggle={vi.fn()}
        onSizeToggle={vi.fn()}
        onContinue={vi.fn()}
      />
    )
    await waitFor(() => {
      expect(screen.getByText('Staple Tee')).toBeInTheDocument()
    })
    // Click the category tab button (first matching "T-Shirt" is the tab)
    const tshirtButtons = screen.getAllByText('T-Shirt')
    fireEvent.click(tshirtButtons[0])
    expect(screen.getByText('Staple Tee')).toBeInTheDocument()
    expect(screen.queryByText('Heavy Hoodie')).not.toBeInTheDocument()
  })
})
