import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MetricCard from '../MetricCard'

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Total Sales" value="$1,234" />)
    expect(screen.getByText('Total Sales')).toBeInTheDocument()
    expect(screen.getByText('$1,234')).toBeInTheDocument()
  })

  it('renders positive change badge', () => {
    render(<MetricCard label="Revenue" value="$500" change="+12%" />)
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('renders negative change badge', () => {
    render(<MetricCard label="Returns" value="3" change="-5%" />)
    expect(screen.getByText('-5%')).toBeInTheDocument()
  })

  it('renders without change badge when not provided', () => {
    const { container } = render(<MetricCard label="Views" value="100" />)
    expect(container.querySelector('[data-testid="metric-change"]')).toBeNull()
  })
})
