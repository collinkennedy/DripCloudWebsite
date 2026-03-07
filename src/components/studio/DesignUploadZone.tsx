import { useCallback, useState } from 'react'
import { Upload, FileImage } from 'lucide-react'

interface DesignUploadZoneProps {
  onFileSelect: (file: File) => void
  uploading: boolean
  fileName: string | null
}

export default function DesignUploadZone({ onFileSelect, uploading, fileName }: DesignUploadZoneProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect]
  )

  if (uploading) {
    return (
      <div data-testid="upload-zone" className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#6B2D8B] bg-purple-50 p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-[#6B2D8B]" />
        <p className="mt-3 text-sm font-medium text-[#6B2D8B]">Uploading...</p>
      </div>
    )
  }

  if (fileName) {
    return (
      <div data-testid="upload-zone" className="flex flex-col items-center justify-center rounded-xl border-2 border-[#6B2D8B] bg-purple-50 p-12">
        <FileImage size={32} className="text-[#6B2D8B]" />
        <p className="mt-3 text-sm font-medium text-gray-900">{fileName}</p>
        <label className="mt-2 cursor-pointer text-sm font-medium text-[#6B2D8B] hover:underline">
          Replace file
          <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
        </label>
      </div>
    )
  }

  return (
    <div
      data-testid="upload-zone"
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
        dragOver ? 'border-[#6B2D8B] bg-purple-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      <Upload size={32} className="text-gray-400" />
      <p className="mt-3 text-sm font-medium text-gray-700">
        Drag and drop your design file here
      </p>
      <p className="mt-1 text-xs text-gray-500">PNG, JPG, or SVG up to 200MB</p>
      <label className="mt-4 cursor-pointer rounded-lg bg-[#6B2D8B] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a2576]">
        Browse Files
        <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
      </label>
    </div>
  )
}
