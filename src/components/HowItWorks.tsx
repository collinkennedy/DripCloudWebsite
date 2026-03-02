import { useState, useEffect, useCallback } from 'react'

const STEPS = [
  {
    number: '1',
    title: 'Design',
    description:
      'Upload your designs or work with our team to create custom merchandise.',
  },
  {
    number: '2',
    title: 'Sell',
    description:
      'Your customers order from your branded storefront. We handle the rest.',
  },
  {
    number: '3',
    title: 'Fulfill',
    description:
      'We print, pack, and ship every order on demand. No inventory needed.',
  },
]

const AUTO_ADVANCE_MS = 7000

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % STEPS.length)
    setProgress(0)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(advance, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [advance, activeIndex])

  // Progress bar animation (updates every 50ms for smooth fill)
  useEffect(() => {
    setProgress(0)
    const tick = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 50 / AUTO_ADVANCE_MS
        return next >= 1 ? 1 : next
      })
    }, 50)
    return () => clearInterval(tick)
  }, [activeIndex])

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }

  const active = STEPS[activeIndex]

  return (
    <section data-testid="how-it-works" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
        </div>

        {/* Tabs */}
        <div role="tablist" className="grid grid-cols-3 gap-0">
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={step.number}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${step.number}`}
                onClick={() => handleTabClick(i)}
                className="group text-left pb-4 pt-2 px-2 focus:outline-none cursor-pointer"
              >
                {/* Number + Title */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-[#6B2D8B]' : 'text-gray-300'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="relative h-[3px] bg-gray-200 rounded-full overflow-hidden">
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 bg-[#6B2D8B] rounded-full"
                      style={{
                        width: `${progress * 100}%`,
                        transition: 'width 50ms linear',
                      }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <div
          id={`panel-${active.number}`}
          role="tabpanel"
          className="mt-10"
        >
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {active.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
