interface ProductPreviewPanelProps {
  imageUrl: string
  title: string
}

export default function ProductPreviewPanel({ imageUrl, title }: ProductPreviewPanelProps) {
  return (
    <div data-testid="product-preview" className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain p-4"
        />
      </div>
    </div>
  )
}
