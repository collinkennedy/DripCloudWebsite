import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithRouter } from '../../../test/renderWithRouter'
import StudioLayout from '../StudioLayout'
import { Routes, Route } from 'react-router-dom'

const mockUseAuth = vi.fn()

vi.mock('../../../lib/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}))

function renderLayout(initialEntries = ['/design']) {
  return renderWithRouter(
    <Routes>
      <Route path="/design" element={<StudioLayout />}>
        <Route index element={<div data-testid="studio-child">Child</div>} />
      </Route>
      <Route path="/login" element={<div data-testid="login-redirect">Login</div>} />
    </Routes>,
    { initialEntries }
  )
}

describe('StudioLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while auth is loading', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true })
    renderLayout()
    expect(screen.getByTestId('studio-loading')).toBeInTheDocument()
  })

  it('redirects to login when not authenticated', () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false })
    renderLayout()
    expect(screen.getByTestId('login-redirect')).toBeInTheDocument()
  })

  it('renders layout and child when authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { id: 'u1' }, loading: false })
    renderLayout()
    expect(screen.getByTestId('studio-layout')).toBeInTheDocument()
    expect(screen.getByTestId('studio-child')).toBeInTheDocument()
  })
})
