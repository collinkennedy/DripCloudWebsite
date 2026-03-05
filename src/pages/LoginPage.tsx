import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'

type LoginMethod = 'password' | 'magic-link'

export default function LoginPage() {
  const [method, setMethod] = useState<LoginMethod>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted', { method, email, password })
  }

  return (
    <div data-testid="login-page" className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20">
        {/* Left: Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[Caprasimo]">
                Welcome back
              </h1>
              <p className="mt-2 text-gray-600">
                Log in to your DripCloud account
              </p>
            </div>

            {/* Method toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setMethod('password')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  method === 'password'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Email &amp; Password
              </button>
              <button
                type="button"
                onClick={() => setMethod('magic-link')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  method === 'magic-link'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Magic Link
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {method === 'password' && (
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
                    placeholder="Enter your password"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5A2372] transition-colors"
              >
                {method === 'password' ? 'Log In' : 'Send Magic Link'}
              </button>
            </form>

            {/* TODO: Google OAuth button */}

            <p className="text-center text-sm text-gray-600">
              New to DripCloud?{' '}
              <Link
                to="/signup"
                className="font-medium text-[#6B2D8B] hover:text-[#5A2372]"
              >
                Sign Up
              </Link>
            </p>
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
