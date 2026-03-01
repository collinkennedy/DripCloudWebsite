import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HowItWorks from '../HowItWorks'

describe('HowItWorks', () => {
  it('renders section title', () => {
    render(<HowItWorks />)
    expect(screen.getByText('How It Works')).toBeInTheDocument()
  })

  it('renders all three steps', () => {
    render(<HowItWorks />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Sell')).toBeInTheDocument()
    expect(screen.getByText('Fulfill')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()
    expect(screen.getByText(/branded storefront/i)).toBeInTheDocument()
    expect(screen.getByText(/print, pack, and ship/i)).toBeInTheDocument()
  })

  it('has how-it-works testid', () => {
    render(<HowItWorks />)
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument()
  })
})