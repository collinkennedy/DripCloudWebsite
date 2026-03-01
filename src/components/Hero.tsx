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
          className="inline-block bg-[#6B2D8B] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5a2575] transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Book a Demo
        </a>
      </div>
    </section>
  )
}

export default Hero