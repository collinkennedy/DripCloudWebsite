import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from '../../test/renderWithRouter'
import SignupPage from '../SignupPage'

describe('SignupPage', () => {
  it('has signup-page testid', () => {
    renderWithRouter(<SignupPage />)
    expect(screen.getByTestId('signup-page')).toBeInTheDocument()
  })

  it('renders heading', () => {
    renderWithRouter(<SignupPage />)
    expect(screen.getByText('Create your account')).toBeInTheDocument()
  })

  it('renders name, email, and password fields', () => {
    renderWithRouter(<SignupPage />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders Create Account button', () => {
    renderWithRouter(<SignupPage />)
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('has login link pointing to /login', () => {
    renderWithRouter(<SignupPage />)
    const loginLinks = screen.getAllByText('Log In')
    const formLink = loginLinks[loginLinks.length - 1]
    expect(formLink.closest('a')).toHaveAttribute('href', '/login')
  })
})
