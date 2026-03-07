import { Link } from 'react-router-dom'
import StudioProgress from './StudioProgress'
import type { WizardStep } from '../../types/catalog'

interface StudioTopBarProps {
  currentStep: WizardStep
}

export default function StudioTopBar({ currentStep }: StudioTopBarProps) {
  return (
    <header data-testid="studio-topbar" className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <Link to="/dashboard" className="text-xl font-bold text-[#6B2D8B]" style={{ fontFamily: 'Caprasimo, cursive' }}>
        DripCloud
      </Link>
      <StudioProgress currentStep={currentStep} />
      <button
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Save Draft
      </button>
    </header>
  )
}
