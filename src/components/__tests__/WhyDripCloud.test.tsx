import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WhyDripCloud from '../WhyDripCloud'

describe('WhyDripCloud', () => {
  it('renders section title', () => {
    render(<WhyDripCloud />)
    expect(screen.getByText('Why DripCloud')).toBeInTheDocument()
  })

  it('renders all four value props', () => {
    render(<WhyDripCloud />)
    expect(screen.getByText('No Minimum Orders')).toBeInTheDocument()
    expect(screen.getByText('Zero Inventory Risk')).toBeInTheDocument()
    expect(screen.getByText('Your Brand, Your Way')).toBeInTheDocument()
    expect(screen.getByText('We Handle Fulfillment')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<WhyDripCloud />)
    expect(screen.getByText(/printed on demand/i)).toBeInTheDocument()
    expect(screen.getByText(/no upfront costs/i)).toBeInTheDocument()
    expect(screen.getByText(/creative control/i)).toBeInTheDocument()
    expect(screen.getByText(/printing to shipping/i)).toBeInTheDocument()
  })

  it('has why-dripcloud testid', () => {
    render(<WhyDripCloud />)
    expect(screen.getByTestId('why-dripcloud')).toBeInTheDocument()
  })
})