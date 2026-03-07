import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  BarChart3,
  Settings,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface SidebarProps {
  user: User
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Products', icon: Package, path: '/dashboard/products' },
  { label: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
  { label: 'Storefront', icon: Store, path: '/dashboard/storefront' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export default function Sidebar({ user }: SidebarProps) {
  const { pathname } = useLocation()
  const businessName = user.user_metadata?.business_name || 'My Store'

  function isActive(path: string) {
    if (path === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(path)
  }

  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B2D8B]">
          <span className="text-sm font-bold text-white">D</span>
        </div>
        <Link to="/dashboard" className="text-lg font-bold text-gray-900">
          DripCloud
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(path)
                ? 'bg-purple-50 text-[#6B2D8B]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="mb-3 rounded-lg bg-purple-50 px-3 py-2 text-center">
          <span className="text-xs font-semibold text-[#6B2D8B]">PRO PLAN</span>
        </div>
        <button className="mb-3 w-full rounded-lg border border-[#6B2D8B] py-2 text-sm font-medium text-[#6B2D8B] hover:bg-purple-50">
          Upgrade Now
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
            {(user.user_metadata?.full_name || 'U')
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">{businessName}</span>
        </div>
      </div>
    </aside>
  )
}
