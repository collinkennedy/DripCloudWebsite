import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from './test/renderWithRouter'
import App from './App'

describe('App routing', () => {
  it('renders home page at /', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] })
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument()
    expect(screen.getByTestId('why-dripcloud')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders login page at /login', () => {
    renderWithRouter(<App />, { initialEntries: ['/login'] })
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('renders signup page at /signup', () => {
    renderWithRouter(<App />, { initialEntries: ['/signup'] })
    expect(screen.getByTestId('signup-page')).toBeInTheDocument()
  })

  it('renders dashboard loading state at /dashboard', () => {
    renderWithRouter(<App />, { initialEntries: ['/dashboard'] })
    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument()
  })

  it('renders studio loading state at /dashboard/design', () => {
    renderWithRouter(<App />, { initialEntries: ['/dashboard/design'] })
    expect(screen.getByTestId('studio-loading')).toBeInTheDocument()
  })
})
