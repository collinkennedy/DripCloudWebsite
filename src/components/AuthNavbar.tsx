import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function AuthNavbar() {
  return (
    <nav
      data-testid="auth-navbar"
      className="bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/">
            <img src={logo} alt="DripCloud" className="h-12 w-auto" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
