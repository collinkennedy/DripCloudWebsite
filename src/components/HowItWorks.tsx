import { useState, useEffect, useCallback } from 'react'
import { Image, PenTool, Layers, CheckCircle2, Heart, ArrowRight } from 'lucide-react'

interface Feature {
  icon: React.ElementType
  text: string
}

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  features: Feature[]
  cta: string
}

const STEPS: Step[] = [
  {
    number: '1',
    title: 'Design',
    subtitle: 'Upload your designs or work with our team.',
    description:
      'Create custom merchandise that stands out. Whether you have your own artwork ready to go or need our expert design team to help bring your vision to life, we\u2019ve got you covered.',
    features: [
      { icon: Image, text: 'High-resolution mockup generator' },
      { icon: PenTool, text: 'Free professional design support' },
      { icon: Layers, text: 'Hundreds of premium products' },
    ],
    cta: 'Start Designing',
  },
  {
    number: '2',
    title: 'Sell',
    subtitle: 'Launch your branded storefront in minutes.',
    description:
      'Your customers order from your branded storefront. We handle the rest.',
    features: [],
    cta: '',
  },
  {
    number: '3',
    title: 'Fulfill',
    subtitle: 'We handle printing, packing, and shipping.',
    description:
      'We print, pack, and ship every order on demand. No inventory needed.',
    features: [],
    cta: '',
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
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
            {/* Text area */}
            <div className="flex-1 flex flex-col gap-6">
              <h3 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-tight tracking-tight">
                {active.subtitle}
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                {active.description}
              </p>

              {active.features.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  {active.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
                        <feature.icon size={14} className="text-[#6B2D8B]" />
                      </div>
                      <span className="text-base font-medium text-gray-900">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {active.cta && (
                <div className="mt-6">
                  <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3.5 rounded-md text-base font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
                    {active.cta}
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Image area */}
            <div className="flex-[1.2] relative">
              {/* Blob background */}
              <div
                className="hiw-blob absolute -top-[15%] -right-[10%] w-[90%] h-[120%] z-0"
                style={{
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
                  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                }}
              />

              {/* Main image */}
              <div className="relative z-[1] rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.08)] border border-gray-100 bg-white">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#f3e8ff] via-[#ede9fe] to-[#e0d5f5] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/60 flex items-center justify-center">
                      <PenTool size={32} className="text-[#6B2D8B]" />
                    </div>
                    <p className="text-[#6B2D8B] font-semibold text-lg">Design Studio</p>
                    <p className="text-[#6B2D8B]/60 text-sm mt-1">Drag & drop editor</p>
                  </div>
                </div>
              </div>

              {/* Floating card: Print Ready */}
              <div className="hiw-float absolute -bottom-7 -left-7 z-[2] bg-white px-6 py-4 rounded-md shadow-[0_16px_32px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-[#6B2D8B]" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900">Print Ready</div>
                  <div className="text-sm text-gray-400">300 DPI Vector</div>
                </div>
              </div>

              {/* Floating card: Premium Quality */}
              <div className="hiw-float-delayed absolute -top-5 -right-5 z-[2] bg-white px-5 py-3 rounded-md shadow-[0_16px_32px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fdf2f8] flex items-center justify-center">
                  <Heart size={18} className="text-[#db2777]" />
                </div>
                <span className="text-[15px] font-semibold text-gray-900">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
