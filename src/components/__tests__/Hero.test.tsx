import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getByText('Custom Merch, Zero Waste')).toBeInTheDocument()
  })

  it('renders subheadline', () => {
    render(<Hero />)
    expect(screen.getByText(/no minimums/i)).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<Hero />)
    expect(screen.getByText('Book a Demo')).toBeInTheDocument()
  })

  it('has hero testid', () => {
    render(<Hero />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })
})