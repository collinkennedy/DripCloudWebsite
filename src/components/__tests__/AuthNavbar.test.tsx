import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from '../../test/renderWithRouter'
import AuthNavbar from '../AuthNavbar'

describe('AuthNavbar', () => {
  it('has auth-navbar testid', () => {
    renderWithRouter(<AuthNavbar />)
    expect(screen.getByTestId('auth-navbar')).toBeInTheDocument()
  })

  it('renders logo', () => {
    renderWithRouter(<AuthNavbar />)
    expect(screen.getByAltText('DripCloud')).toBeInTheDocument()
  })

  it('logo links to home', () => {
    renderWithRouter(<AuthNavbar />)
    const logo = screen.getByAltText('DripCloud')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })
})
