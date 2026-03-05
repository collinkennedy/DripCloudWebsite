import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from '../../test/renderWithRouter'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders logo', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByAltText('DripCloud')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getAllByText('About')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Inquire')[0]).toBeInTheDocument()
  })

  it('renders Book a Demo button', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getAllByText('Book a Demo')[0]).toBeInTheDocument()
  })

  it('has navbar testid', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('renders Log In link', () => {
    renderWithRouter(<Navbar />)
    const loginLinks = screen.getAllByText('Log In')
    expect(loginLinks.length).toBeGreaterThanOrEqual(1)
    expect(loginLinks[0].closest('a')).toHaveAttribute('href', '/login')
  })
})
