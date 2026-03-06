import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          business_name: businessName,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setConfirmationSent(true)
  }

  return (
    <div data-testid="signup-page" className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Left: Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[Caprasimo]">
                Create your account
              </h1>
              <p className="mt-2 text-gray-600">
                Get started with DripCloud
              </p>
            </div>

            {confirmationSent ? (
              <div className="rounded-lg bg-green-50 p-6 text-sm text-green-700">
                <p className="font-medium text-base">Check your email!</p>
                <p className="mt-2">
                  We sent a confirmation link to <strong>{email}</strong>.
                  Click the link in the email to verify your account, then
                  you can log in.
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-block font-medium text-[#6B2D8B] hover:text-[#5A2372]"
                >
                  Go to Log In
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6B2D8B] focus:ring-[#6B2D8B] focus:outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="business-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business Name
                    </label>
                    <input
                      id="business-name"
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6B2D8B] focus:ring-[#6B2D8B] focus:outline-none"
                      placeholder="Joe's Coffee Shop"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6B2D8B] focus:ring-[#6B2D8B] focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#6B2D8B] focus:ring-[#6B2D8B] focus:outline-none"
                      placeholder="Create a password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5A2372] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-[#6B2D8B] hover:text-[#5A2372]"
                  >
                    Log In
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right: Purple branding panel */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-b from-[#D4B8E8] to-[#6B2D8B] items-center justify-center">
          <img
            src={logo}
            alt="DripCloud"
            className="w-56 h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
