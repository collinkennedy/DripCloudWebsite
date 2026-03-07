import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '../Sidebar'

const mockUser = {
  user_metadata: {
    full_name: 'Jane Smith',
    business_name: 'Cool Merch Co',
  },
}

function renderSidebar(pathname = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Sidebar user={mockUser as any} />
    </MemoryRouter>
  )
}

describe('Sidebar', () => {
  it('renders DripCloud logo', () => {
    renderSidebar()
    expect(screen.getByText('DripCloud')).toBeInTheDocument()
  })

  it('renders all nav items', () => {
    renderSidebar()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Storefront')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active nav item based on pathname', () => {
    renderSidebar('/dashboard/products')
    const productsLink = screen.getByText('Products').closest('a')
    expect(productsLink).toHaveClass('bg-purple-50')
  })

  it('renders user business name', () => {
    renderSidebar()
    expect(screen.getByText('Cool Merch Co')).toBeInTheDocument()
  })
})
