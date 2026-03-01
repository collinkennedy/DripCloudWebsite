import React from 'react'

const Hero: React.FC = () => {
  return (
    <section 
      data-testid="hero"
      className="w-full min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-br from-[#6B2D8B] to-[#9B59B6] px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Custom Merch, Zero Waste
        </h1>
        
        <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Design and sell branded merchandise on demand. No minimums, no excess inventory, no hassle.
        </p>
        
        <a 
          href="#"
          className="book-demo-btn inline-block bg-[#6B2D8B] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <span className="relative z-10">Book a Demo</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
