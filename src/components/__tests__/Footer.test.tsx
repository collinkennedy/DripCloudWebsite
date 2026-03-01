import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />)
    expect(screen.getByAltText('DripCloud')).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/on-demand merchandise/i)).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/DripCloud LLC. All rights reserved/i)).toBeInTheDocument()
  })

  it('renders contact link', () => {
    render(<Footer />)
    const link = screen.getByText('Contact Us')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'mailto:chandler@thedripcloud.com')
  })

  it('has footer testid', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})