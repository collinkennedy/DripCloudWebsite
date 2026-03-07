import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TopBar from '../TopBar'

const mockUser = {
  user_metadata: {
    full_name: 'Jane Smith',
  },
}

describe('TopBar', () => {
  it('renders search input', () => {
    render(<TopBar user={mockUser as any} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders notification bell', () => {
    render(<TopBar user={mockUser as any} />)
    expect(screen.getByTestId('notification-bell')).toBeInTheDocument()
  })

  it('renders user name', () => {
    render(<TopBar user={mockUser as any} />)
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('renders user initials avatar', () => {
    render(<TopBar user={mockUser as any} />)
    expect(screen.getByText('JS')).toBeInTheDocument()
  })
})
