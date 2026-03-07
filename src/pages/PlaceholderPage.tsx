import { useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const pageName = pathname.split('/').pop() || 'Page'
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1)

  return (
    <div data-testid="placeholder-page" className="flex flex-col items-center justify-center py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
        <Construction size={24} className="text-[#6B2D8B]" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">This feature is coming soon.</p>
    </div>
  )
}
