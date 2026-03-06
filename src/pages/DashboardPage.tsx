import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'
import Navbar from '../components/Navbar'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const fullName = user.user_metadata?.full_name || 'there'
  const businessName = user.user_metadata?.business_name || 'Your Business'

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 font-[Caprasimo]">
          Welcome, {fullName}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          You're signed in as <strong>{businessName}</strong>.
        </p>
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          <p className="text-lg font-medium">Your dashboard is coming soon.</p>
          <p className="mt-1 text-sm">
            This is where you'll design merch, manage your storefront, and track
            orders.
          </p>
        </div>
      </main>
    </div>
  )
}
