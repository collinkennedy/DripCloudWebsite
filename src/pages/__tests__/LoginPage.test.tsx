import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from '../../test/renderWithRouter'
import LoginPage from '../LoginPage'

describe('LoginPage', () => {
  it('has login-page testid', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('renders heading', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByText('Welcome back')).toBeInTheDocument()
  })

  it('renders email field', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders password field in password mode', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('hides password field in magic-link mode', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginPage />)
    await user.click(screen.getByText('Magic Link'))
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument()
  })

  it('shows correct submit button text for each mode', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginPage />)
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()

    await user.click(screen.getByText('Magic Link'))
    expect(screen.getByRole('button', { name: 'Send Magic Link' })).toBeInTheDocument()
  })

  it('has sign-up link pointing to /signup', () => {
    renderWithRouter(<LoginPage />)
    const signUpLink = screen.getByText('Sign Up')
    expect(signUpLink.closest('a')).toHaveAttribute('href', '/signup')
  })
})
