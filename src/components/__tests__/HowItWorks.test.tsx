import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import HowItWorks from '../HowItWorks'

describe('HowItWorks', () => {
  it('has how-it-works testid', () => {
    render(<HowItWorks />)
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<HowItWorks />)
    expect(screen.getByText('How It Works')).toBeInTheDocument()
  })

  it('renders all three tab titles', () => {
    render(<HowItWorks />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Sell')).toBeInTheDocument()
    expect(screen.getByText('Fulfill')).toBeInTheDocument()
  })

  it('shows the first tab (Design) as active by default', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()
  })

  it('switches content when clicking a tab', async () => {
    const user = userEvent.setup()
    render(<HowItWorks />)

    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /sell/i }))
    expect(screen.getByText(/branded storefront/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /fulfill/i }))
    expect(screen.getByText(/print, pack, and ship/i)).toBeInTheDocument()
  })

  it('renders step descriptions for all tabs', async () => {
    const user = userEvent.setup()
    render(<HowItWorks />)

    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /sell/i }))
    expect(screen.getByText(/branded storefront/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /fulfill/i }))
    expect(screen.getByText(/print, pack, and ship/i)).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected', async () => {
    const user = userEvent.setup()
    render(<HowItWorks />)

    const designTab = screen.getByRole('tab', { name: /design/i })
    const sellTab = screen.getByRole('tab', { name: /sell/i })

    expect(designTab).toHaveAttribute('aria-selected', 'true')
    expect(sellTab).toHaveAttribute('aria-selected', 'false')

    await user.click(sellTab)
    expect(designTab).toHaveAttribute('aria-selected', 'false')
    expect(sellTab).toHaveAttribute('aria-selected', 'true')
  })

  it('auto-advances to the next tab', () => {
    vi.useFakeTimers()
    try {
      render(<HowItWorks />)

      expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(7000)
      })
      expect(screen.getByText(/branded storefront/i)).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(7000)
      })
      expect(screen.getByText(/print, pack, and ship/i)).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(7000)
      })
      expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})
