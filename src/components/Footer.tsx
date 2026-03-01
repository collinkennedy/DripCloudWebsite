import React from 'react'
import logo from '../assets/logo.png'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer data-testid="footer" className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-4">
            <img 
              src={logo} 
              alt="DripCloud" 
              className="h-8 w-auto mr-3"
            />
            <span className="text-xl font-bold">DripCloud</span>
          </div>
          
          {/* Tagline */}
          <p className="text-gray-300 mb-6">
            On-demand merchandise for growing businesses.
          </p>
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} DripCloud. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer