import React from 'react'
import logo from '../assets/logo.png'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer data-testid="footer" className="bg-white border-t border-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center mb-4">
            <img 
              src={logo} 
              alt="DripCloud" 
              className="h-6 w-auto mr-2"
            />
            <span className="text-lg font-bold" style={{ color: '#6B2D8B' }}>DripCloud</span>
          </div>
          
          {/* Tagline */}
          <p className="text-gray-500 text-sm mb-3">
            On-demand merchandise for growing businesses.
          </p>

          {/* Contact */}
          <a
            href="mailto:chandler@thedripcloud.com"
            className="text-sm hover:underline"
            style={{ color: '#6B2D8B' }}
          >
            Contact Us
          </a>
          
          {/* Copyright */}
          <p className="text-gray-400 text-xs mt-3">
            © {currentYear} DripCloud LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
