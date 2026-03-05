import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { renderWithRouter } from '../../test/renderWithRouter'
import HowItWorks from '../HowItWorks'

describe('HowItWorks', () => {
  it('has how-it-works testid', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument()
  })

  it('renders section title', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByText('How It Works')).toBeInTheDocument()
  })

  it('renders all three tab titles', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Sell')).toBeInTheDocument()
    expect(screen.getByText('Fulfill')).toBeInTheDocument()
  })

  it('shows the first tab (Design) as active by default', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()
  })

  it('renders Design tab features', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByText('High-resolution mockup generator')).toBeInTheDocument()
    expect(screen.getByText('Free professional design support')).toBeInTheDocument()
    expect(screen.getByText('Hundreds of premium products')).toBeInTheDocument()
  })

  it('renders Design tab CTA link', () => {
    renderWithRouter(<HowItWorks />)
    const cta = screen.getByRole('link', { name: /start designing/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/signup')
  })

  it('renders Design tab floating cards', () => {
    renderWithRouter(<HowItWorks />)
    expect(screen.getByText('Print Ready')).toBeInTheDocument()
    expect(screen.getByText('Premium Quality')).toBeInTheDocument()
  })

  it('renders Sell tab collage and sales badge', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HowItWorks />)

    await user.click(screen.getByRole('tab', { name: /sell/i }))

    expect(screen.getByAltText('E-commerce dashboard')).toBeInTheDocument()
    expect(screen.getByAltText('Branded merchandise')).toBeInTheDocument()
    expect(screen.getByText('+24% Sales')).toBeInTheDocument()
  })

  it('renders Fulfill tab visual with tracking timeline', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HowItWorks />)

    await user.click(screen.getByRole('tab', { name: /fulfill/i }))

    expect(screen.getByText('Fulfillment Progress')).toBeInTheDocument()
    expect(screen.getByText('On Track')).toBeInTheDocument()
    expect(screen.getByText('Printed & Inspected')).toBeInTheDocument()
    expect(screen.getByText('Branded & Packed')).toBeInTheDocument()
    expect(screen.getByText('Shipped & Tracked')).toBeInTheDocument()
  })

  it('renders Fulfill tab floating cards', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HowItWorks />)

    await user.click(screen.getByRole('tab', { name: /fulfill/i }))

    expect(screen.getByText('Zero Inventory')).toBeInTheDocument()
    expect(screen.getByText('No Minimums')).toBeInTheDocument()
  })

  it('switches content when clicking a tab', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HowItWorks />)

    expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /sell/i }))
    expect(screen.getByText(/sell your merch/i)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /fulfill/i }))
    expect(screen.getByText(/print, pack, and ship/i)).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected', async () => {
    const user = userEvent.setup()
    renderWithRouter(<HowItWorks />)

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
      renderWithRouter(<HowItWorks />)

      expect(screen.getByText(/upload your designs/i)).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(7000)
      })
      expect(screen.getByText(/sell your merch/i)).toBeInTheDocument()

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
