import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StudioProgress from '../StudioProgress'

describe('StudioProgress', () => {
  it('highlights current step', () => {
    render(<StudioProgress currentStep="PRODUCT" />)
    const progress = screen.getByTestId('studio-progress')
    expect(progress).toBeInTheDocument()
    expect(screen.getByText('Product')).toHaveClass('text-[#6B2D8B]')
    expect(screen.getByText('Design')).toHaveClass('text-gray-400')
    expect(screen.getByText('Confirm')).toHaveClass('text-gray-400')
  })

  it('shows completed steps', () => {
    render(<StudioProgress currentStep="DESIGN" />)
    expect(screen.getByText('Product')).toHaveClass('text-gray-900')
    expect(screen.getByText('Design')).toHaveClass('text-[#6B2D8B]')
    expect(screen.getByText('Confirm')).toHaveClass('text-gray-400')
  })

  it('shows all steps on confirm', () => {
    render(<StudioProgress currentStep="CONFIRM" />)
    expect(screen.getByText('Product')).toHaveClass('text-gray-900')
    expect(screen.getByText('Design')).toHaveClass('text-gray-900')
    expect(screen.getByText('Confirm')).toHaveClass('text-[#6B2D8B]')
  })
})
