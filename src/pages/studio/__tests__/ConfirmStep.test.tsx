import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ConfirmStep from '../ConfirmStep'

function renderStep(overrides = {}) {
  const props = {
    mockupUrls: ['https://mockup1.jpg'],
    productTitle: 'Unisex Staple Tee',
    baseCost: 12.95,
    title: 'My Cool Tee',
    description: 'A great shirt',
    retailPrice: 29.99,
    onTitleChange: vi.fn(),
    onDescriptionChange: vi.fn(),
    onRetailPriceChange: vi.fn(),
    onCreateProduct: vi.fn(),
    onBack: vi.fn(),
    creating: false,
    ...overrides,
  }
  return render(
    <MemoryRouter>
      <ConfirmStep {...props} />
    </MemoryRouter>
  )
}

describe('ConfirmStep', () => {
  it('renders form inputs', () => {
    renderStep()
    expect(screen.getByTestId('confirm-step')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveValue('My Cool Tee')
    expect(screen.getByLabelText('Description')).toHaveValue('A great shirt')
    expect(screen.getByLabelText('Retail Price ($)')).toHaveValue(29.99)
  })

  it('renders pricing summary', () => {
    renderStep()
    expect(screen.getByTestId('pricing-summary')).toBeInTheDocument()
  })

  it('renders create button', () => {
    renderStep()
    expect(screen.getByText('Create Product')).toBeInTheDocument()
  })

  it('disables create button when creating', () => {
    renderStep({ creating: true })
    expect(screen.getByText('Creating...')).toBeDisabled()
  })

  it('calls onCreateProduct when button clicked', () => {
    const onCreateProduct = vi.fn()
    renderStep({ onCreateProduct })
    fireEvent.click(screen.getByText('Create Product'))
    expect(onCreateProduct).toHaveBeenCalled()
  })

  it('calls onBack when back clicked', () => {
    const onBack = vi.fn()
    renderStep({ onBack })
    fireEvent.click(screen.getByText('Back'))
    expect(onBack).toHaveBeenCalled()
  })
})
