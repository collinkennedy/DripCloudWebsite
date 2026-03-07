import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MockupPreview from '../MockupPreview'

describe('MockupPreview', () => {
  it('shows idle state', () => {
    render(<MockupPreview status="idle" mockupUrls={[]} error={null} />)
    expect(screen.getByText(/Upload a design/)).toBeInTheDocument()
  })

  it('shows generating state', () => {
    render(<MockupPreview status="generating" mockupUrls={[]} error={null} />)
    expect(screen.getByText(/Generating mockups/)).toBeInTheDocument()
  })

  it('shows completed state with images', () => {
    render(
      <MockupPreview
        status="completed"
        mockupUrls={['https://mockup1.jpg', 'https://mockup2.jpg']}
        error={null}
      />
    )
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
  })

  it('shows failed state with error', () => {
    render(<MockupPreview status="failed" mockupUrls={[]} error="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
