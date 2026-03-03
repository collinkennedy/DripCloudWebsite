import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clothingRack from '../assets/clothing_rack_pic.png'

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
    >
      {/* Background image */}
      <img
        src={clothingRack}
        alt="Clothing rack displaying custom branded merchandise"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

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
