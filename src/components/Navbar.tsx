import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 py-3">
            <Link to="/">
              <img
                src={logo}
                alt="DripCloud"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:text-[#6B2D8B] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-900 hover:text-[#6B2D8B] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Inquire
              </a>
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="text-gray-900 hover:text-[#6B2D8B] px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-[#6B2D8B] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Log In
                </Link>
              )}
              <a
                href="https://calendly.com/ryan-thedripcloud/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#6B2D8B] hover:bg-[#5A2372] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6B2D8B]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <a
            href="#"
            className="text-gray-900 hover:text-[#6B2D8B] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-[#6B2D8B] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Inquire
          </a>
          {user ? (
            <button
              onClick={() => signOut()}
              className="text-gray-900 hover:text-[#6B2D8B] block px-3 py-2 text-base font-medium transition-colors duration-200 cursor-pointer w-full text-left"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-900 hover:text-[#6B2D8B] block px-3 py-2 text-base font-medium transition-colors duration-200"
            >
              Log In
            </Link>
          )}
          <a
            href="https://calendly.com/ryan-thedripcloud/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6B2D8B] hover:bg-[#5A2372] text-white block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 mt-4"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </nav>
  )
}
