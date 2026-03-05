import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup submitted', { name, email, password })
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
                className="w-full rounded-lg bg-[#6B2D8B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5A2372] transition-colors"
              >
                Create Account
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
