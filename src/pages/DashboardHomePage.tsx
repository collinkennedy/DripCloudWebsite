import { Link, useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import MetricCard from '../components/dashboard/MetricCard'
import GrowthCenter from '../components/dashboard/GrowthCenter'
import StoreChecklist from '../components/dashboard/StoreChecklist'

interface DashboardHomePageProps {
  user?: User
}

const mockMetrics = [
  { label: 'Total Sales', value: '$0.00', change: '+0%' },
  { label: 'Active Products', value: '0' },
  { label: 'Pending Orders', value: '0' },
  { label: 'Store Visits', value: '0', change: '+0%' },
]

export default function DashboardHomePage({ user: userProp }: DashboardHomePageProps) {
  const context = useOutletContext<{ user: User } | null>()
  const user = userProp ?? context?.user
  const fullName = user?.user_metadata?.full_name || 'there'

  return (
    <div data-testid="dashboard-home">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {fullName}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your store today.
          </p>
        </div>
        <Link
          to="/dashboard/design"
          className="flex items-center gap-2 rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5a2576]"
        >
          <Plus size={16} />
          Create New Design
        </Link>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Active Designs */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Active Designs</h2>
          <Link
            to="/dashboard/products"
            className="text-sm font-medium text-[#6B2D8B] hover:underline"
          >
            View all products
          </Link>
        </div>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          <p className="text-sm">No active designs yet. Create your first product to get started!</p>
        </div>
      </div>

      {/* Growth + Checklist */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GrowthCenter />
        <StoreChecklist />
      </div>
    </div>
  )
}
