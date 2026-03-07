import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DashboardLayout from '../DashboardLayout'
import { AuthProvider } from '../../../lib/AuthProvider'
import { supabase } from '../../../test/mocks/supabase'

const mockSession = {
  user: {
    id: 'user-1',
    email: 'jane@example.com',
    user_metadata: {
      full_name: 'Jane Smith',
      business_name: 'Cool Merch Co',
    },
  },
}

function renderLayout() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while auth initializes', () => {
    supabase.auth.getSession.mockReturnValue(new Promise(() => {}))
    renderLayout()
    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument()
  })

  it('redirects to /login when not authenticated', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })
    renderLayout()
    await waitFor(() => {
      expect(screen.queryByTestId('dashboard-loading')).not.toBeInTheDocument()
    })
  })

  it('renders sidebar and topbar when authenticated', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    })
    renderLayout()
    await waitFor(() => {
      expect(screen.getByText('DripCloud')).toBeInTheDocument()
    })
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
