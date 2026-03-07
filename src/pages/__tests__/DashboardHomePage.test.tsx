import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import DashboardHomePage from '../DashboardHomePage'

const mockUser = {
  user_metadata: {
    full_name: 'Jane Smith',
    business_name: 'Cool Merch Co',
  },
}

function renderPage() {
  return render(
    <MemoryRouter>
      <DashboardHomePage user={mockUser as any} />
    </MemoryRouter>
  )
}

describe('DashboardHomePage', () => {
  it('renders welcome message with user name', () => {
    renderPage()
    expect(screen.getByText(/Welcome back, Jane Smith!/)).toBeInTheDocument()
  })

  it('renders metric cards', () => {
    renderPage()
    expect(screen.getByText('Total Sales')).toBeInTheDocument()
    expect(screen.getByText('Active Products')).toBeInTheDocument()
    expect(screen.getByText('Pending Orders')).toBeInTheDocument()
    expect(screen.getByText('Store Visits')).toBeInTheDocument()
  })

  it('renders active designs section', () => {
    renderPage()
    expect(screen.getByText('Active Designs')).toBeInTheDocument()
  })

  it('renders growth center', () => {
    renderPage()
    expect(screen.getByTestId('growth-center')).toBeInTheDocument()
  })

  it('renders store checklist', () => {
    renderPage()
    expect(screen.getByTestId('store-checklist')).toBeInTheDocument()
  })
})
