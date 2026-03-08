import { ImageIcon, AlertCircle } from 'lucide-react'

type MockupStatus = 'idle' | 'generating' | 'completed' | 'failed'

interface MockupPreviewProps {
  status: MockupStatus
  mockupUrls: string[]
  error: string | null
}

export default function MockupPreview({ status, mockupUrls, error }: MockupPreviewProps) {
  if (status === 'idle') {
    return (
      <div data-testid="mockup-preview" className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-12">
        <ImageIcon size={48} className="text-gray-300" />
        <p className="mt-3 text-sm text-gray-500">Upload a design to generate mockups</p>
      </div>
    )
  }

  if (status === 'generating') {
    return (
      <div data-testid="mockup-preview" className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-[#6B2D8B]" />
        <p className="mt-3 text-sm font-medium text-gray-600">Generating mockups...</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div data-testid="mockup-preview" className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-12">
        <AlertCircle size={48} className="text-red-400" />
        <p className="mt-3 text-sm font-medium text-red-600">{error ?? 'Mockup generation failed'}</p>
      </div>
    )
  }

  if (mockupUrls.length === 1) {
    return (
      <div data-testid="mockup-preview" className="flex justify-center">
        <div className="max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white">
          <img src={mockupUrls[0]} alt="Mockup 1" className="h-full w-full object-contain" />
        </div>
      </div>
    )
  }

  return (
    <div data-testid="mockup-preview" className="grid grid-cols-2 gap-4">
      {mockupUrls.map((url, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <img src={url} alt={`Mockup ${i + 1}`} className="h-full w-full object-contain" />
        </div>
      ))}
    </div>
  )
}
