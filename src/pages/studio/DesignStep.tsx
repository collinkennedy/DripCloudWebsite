import { useCallback, useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import StudioTopBar from '../../components/studio/StudioTopBar'
import DesignUploadZone from '../../components/studio/DesignUploadZone'
import PlacementSelector from '../../components/studio/PlacementSelector'
import MockupPreview from '../../components/studio/MockupPreview'
import { useFileUpload } from '../../hooks/useFileUpload'
import { useMockupGenerator } from '../../hooks/useMockupGenerator'
import type { CatalogProduct } from '../../types/catalog'

interface DesignStepProps {
  selectedProduct: CatalogProduct
  variantIds: number[]
  placement: 'front' | 'back'
  onPlacementChange: (placement: 'front' | 'back') => void
  onDesignUploaded: (url: string, name: string) => void
  onMockupsGenerated: (urls: string[]) => void
  onContinue: () => void
  onBack: () => void
}

export default function DesignStep({
  selectedProduct,
  variantIds,
  placement,
  onPlacementChange,
  onDesignUploaded,
  onMockupsGenerated,
  onContinue,
  onBack,
}: DesignStepProps) {
  const { upload, uploading, fileUrl, fileName, error: uploadError } = useFileUpload()
  const { generate, status: mockupStatus, mockupUrls, error: mockupError } = useMockupGenerator()

  const handleFileSelect = useCallback(async (file: File) => {
    await upload(file)
  }, [upload])

  // When file is uploaded, trigger mockup generation
  useEffect(() => {
    if (fileUrl && fileName) {
      onDesignUploaded(fileUrl, fileName)
      generate({
        productId: selectedProduct.id,
        variantIds,
        placement,
        imageUrl: fileUrl,
      })
    }
  }, [fileUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  // When mockups are generated, pass them up
  useEffect(() => {
    if (mockupStatus === 'completed' && mockupUrls.length > 0) {
      onMockupsGenerated(mockupUrls)
    }
  }, [mockupStatus, mockupUrls, onMockupsGenerated])

  const canContinue = mockupStatus === 'completed' && mockupUrls.length > 0

  return (
    <div data-testid="design-step" className="flex flex-1 flex-col">
      <StudioTopBar currentStep="DESIGN" />
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Upload + Placement (narrow sidebar) */}
        <div className="flex w-80 flex-shrink-0 flex-col gap-5 overflow-y-auto border-r border-gray-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Upload Your Design</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add your artwork to the {selectedProduct.title}
            </p>
          </div>
          <DesignUploadZone
            onFileSelect={handleFileSelect}
            uploading={uploading}
            fileName={fileName}
          />
          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}
          <PlacementSelector placement={placement} onPlacementChange={onPlacementChange} />
        </div>

        {/* Right: Mockup Preview (main area) */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-gray-50 p-6">
          <MockupPreview status={mockupStatus} mockupUrls={mockupUrls} error={mockupError} />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="flex items-center gap-2 rounded-lg bg-[#6B2D8B] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#5a2576] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Confirm
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
