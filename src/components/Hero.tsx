import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HEADLINE = 'Custom Merch, Zero Waste'
const CHAR_SPEED = 0.1
const INITIAL_DELAY = 0.5
const CURSOR_LINGER = 2

const Hero: React.FC = () => {
  const [charCount, setCharCount] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setCharCount(i)
        if (i >= HEADLINE.length) {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, CHAR_SPEED * 1000)
      return () => clearInterval(interval)
    }, INITIAL_DELAY * 1000)
    return () => clearTimeout(startTimeout)
  }, [])

  useEffect(() => {
    if (typingDone) {
      const timeout = setTimeout(() => setShowCursor(false), CURSOR_LINGER * 1000)
      return () => clearTimeout(timeout)
    }
  }, [typingDone])

  return (
    <section 
      data-testid="hero"
      className="w-full min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 25%, #7e4a9e 50%, #4a1a6b 75%, #1a0a2e 100%)' }}
    >
      {/* Mesh gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(126,74,158,0.8) 0%, transparent 70%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 80% at 20% 60%, rgba(45,27,78,0.9) 0%, transparent 60%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 50% at 80% 30%, rgba(75,0,130,0.7) 0%, transparent 60%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 45% 35% at 50% 38%, rgba(186,130,245,0.5) 0%, rgba(155,89,182,0.2) 40%, transparent 70%)'
        }} />
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-blob hero-blob-1 absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(186,130,245,0.35) 0%, transparent 70%)',
            filter: 'blur(100px)',
            top: '10%', left: '15%',
          }}
        />
        <div className="hero-blob hero-blob-2 absolute rounded-full"
          style={{
            width: '450px', height: '450px',
            background: 'radial-gradient(circle, rgba(75,0,130,0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
            top: '50%', right: '10%',
          }}
        />
        <div className="hero-blob hero-blob-3 absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(218,112,214,0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
            bottom: '5%', left: '40%',
          }}
        />
      </div>

      {/* SVG noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }} />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 flex items-center justify-center whitespace-nowrap">
            <span>{HEADLINE.slice(0, charCount)}</span>
            <AnimatePresence>
              {showCursor && (
                <motion.span
                  className="typewriter-cursor inline-block w-[3px] ml-1 bg-white self-stretch"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                />
              )}
            </AnimatePresence>
          </h1>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: INITIAL_DELAY + HEADLINE.length * CHAR_SPEED + 0.2 }}
        >
          Design and sell branded merchandise on demand. No minimums, no excess inventory, no hassle.
        </motion.p>
        
        <motion.a 
          href="#"
          className="book-demo-btn inline-block bg-[#6B2D8B] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: INITIAL_DELAY + HEADLINE.length * CHAR_SPEED + 0.5 }}
        >
          <span className="relative z-10">Book a Demo</span>
        </motion.a>
      </div>
    </section>
  )
}

export default Hero
