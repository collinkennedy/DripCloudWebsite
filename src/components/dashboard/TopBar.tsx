import { Search, Bell } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface TopBarProps {
  user: User
}

export default function TopBar({ user }: TopBarProps) {
  const fullName = user.user_metadata?.full_name || 'User'
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      {/* Search */}
      <div className="relative w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-[#6B2D8B] focus:ring-1 focus:ring-[#6B2D8B]"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button data-testid="notification-bell" className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell size={18} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B2D8B] text-xs font-medium text-white">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{fullName}</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </header>
  )
}
