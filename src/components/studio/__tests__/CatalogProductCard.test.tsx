import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CatalogProductCard from '../CatalogProductCard'
import type { CatalogProduct } from '../../../types/catalog'

const mockProduct: CatalogProduct = {
  id: 71,
  type_name: 'T-Shirt',
  title: 'Unisex Staple T-Shirt',
  description: 'A comfy tee',
  image: 'https://example.com/tshirt.jpg',
  variant_count: 50,
  currency: 'USD',
  min_price: 12.95,
}

describe('CatalogProductCard', () => {
  it('renders product name and price', () => {
    render(<CatalogProductCard product={mockProduct} selected={false} onSelect={vi.fn()} />)
    expect(screen.getByText('Unisex Staple T-Shirt')).toBeInTheDocument()
    expect(screen.getByText('From $12.95')).toBeInTheDocument()
    expect(screen.getByText('T-Shirt')).toBeInTheDocument()
  })

  it('shows selected state', () => {
    render(<CatalogProductCard product={mockProduct} selected={true} onSelect={vi.fn()} />)
    const card = screen.getByTestId('catalog-card-71')
    expect(card).toHaveClass('border-[#6B2D8B]')
  })

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn()
    render(<CatalogProductCard product={mockProduct} selected={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByTestId('catalog-card-71'))
    expect(onSelect).toHaveBeenCalledWith(mockProduct)
  })
})
