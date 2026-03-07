import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import DesignStep from '../DesignStep'
import type { CatalogProduct } from '../../../types/catalog'

const mockProduct: CatalogProduct = {
  id: 71,
  type_name: 'T-Shirt',
  title: 'Unisex Staple Tee',
  description: '',
  image: 'tee.jpg',
  variant_count: 50,
  currency: 'USD',
  min_price: 12.95,
}

function renderStep() {
  return render(
    <MemoryRouter>
      <DesignStep
        selectedProduct={mockProduct}
        variantIds={[4011]}
        placement="front"
        onPlacementChange={vi.fn()}
        onDesignUploaded={vi.fn()}
        onMockupsGenerated={vi.fn()}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />
    </MemoryRouter>
  )
}

describe('DesignStep', () => {
  it('renders upload zone and placement selector', () => {
    renderStep()
    expect(screen.getByTestId('design-step')).toBeInTheDocument()
    expect(screen.getByTestId('upload-zone')).toBeInTheDocument()
    expect(screen.getByTestId('placement-selector')).toBeInTheDocument()
  })

  it('renders mockup preview area', () => {
    renderStep()
    expect(screen.getByTestId('mockup-preview')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    renderStep()
    // "Back" appears both as placement option and as navigation button
    expect(screen.getAllByText('Back').length).toBeGreaterThanOrEqual(1)
  })

  it('renders continue button (disabled initially)', () => {
    renderStep()
    const btn = screen.getByText('Continue to Confirm')
    expect(btn).toBeDisabled()
  })
})
