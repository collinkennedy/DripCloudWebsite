import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DesignUploadZone from '../DesignUploadZone'

describe('DesignUploadZone', () => {
  it('renders drop zone in idle state', () => {
    render(<DesignUploadZone onFileSelect={vi.fn()} uploading={false} fileName={null} />)
    expect(screen.getByText(/Drag and drop/)).toBeInTheDocument()
    expect(screen.getByText('Browse Files')).toBeInTheDocument()
  })

  it('shows uploading state', () => {
    render(<DesignUploadZone onFileSelect={vi.fn()} uploading={true} fileName={null} />)
    expect(screen.getByText('Uploading...')).toBeInTheDocument()
  })

  it('shows uploaded file name', () => {
    render(<DesignUploadZone onFileSelect={vi.fn()} uploading={false} fileName="design.png" />)
    expect(screen.getByText('design.png')).toBeInTheDocument()
    expect(screen.getByText('Replace file')).toBeInTheDocument()
  })

  it('handles file drop', () => {
    const onFileSelect = vi.fn()
    render(<DesignUploadZone onFileSelect={onFileSelect} uploading={false} fileName={null} />)
    const zone = screen.getByTestId('upload-zone')
    const file = new File(['pixels'], 'art.png', { type: 'image/png' })
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })
    expect(onFileSelect).toHaveBeenCalledWith(file)
  })
})
