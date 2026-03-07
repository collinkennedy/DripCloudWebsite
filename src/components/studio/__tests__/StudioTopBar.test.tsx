import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import StudioTopBar from '../StudioTopBar'

describe('StudioTopBar', () => {
  it('renders logo', () => {
    render(
      <MemoryRouter>
        <StudioTopBar currentStep="PRODUCT" />
      </MemoryRouter>
    )
    expect(screen.getByText('DripCloud')).toBeInTheDocument()
  })

  it('renders progress indicator', () => {
    render(
      <MemoryRouter>
        <StudioTopBar currentStep="PRODUCT" />
      </MemoryRouter>
    )
    expect(screen.getByTestId('studio-progress')).toBeInTheDocument()
  })

  it('renders save draft button', () => {
    render(
      <MemoryRouter>
        <StudioTopBar currentStep="PRODUCT" />
      </MemoryRouter>
    )
    expect(screen.getByText('Save Draft')).toBeInTheDocument()
  })
})
