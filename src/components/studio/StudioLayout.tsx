import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthProvider'

export default function StudioLayout() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading) {
    return (
      <div data-testid="studio-loading" className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#6B2D8B]" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div data-testid="studio-layout" className="flex h-screen flex-col bg-gray-50">
      <Outlet />
    </div>
  )
}
