import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders logo', () => {
    render(<Navbar />)
    expect(screen.getByAltText('DripCloud')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<Navbar />)
    expect(screen.getAllByText('About')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Inquire')[0]).toBeInTheDocument()
  })

  it('renders Book a Demo button', () => {
    render(<Navbar />)
    expect(screen.getAllByText('Book a Demo')[0]).toBeInTheDocument()
  })

  it('has navbar testid', () => {
    render(<Navbar />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })
})