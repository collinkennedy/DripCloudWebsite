import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SELLING_POINTS = [
  {
    title: 'No Minimums',
    description: 'Order one or one thousand. Every order is printed on demand.',
    color: '#2E1065',
    fabric: '#3B1A80',
    highlight: '#4C2899',
    accent: '#6D44B8',
  },
  {
    title: 'Your Brand',
    description: 'Full creative control over every design, label, and tag.',
    color: '#581C87',
    fabric: '#6B2FA0',
    highlight: '#7C3FB5',
    accent: '#9B6DD0',
  },
  {
    title: 'Smart Inventory',
    description: 'AI-powered stock predictions so you never over-order.',
    color: '#6B21A8',
    fabric: '#7E3BBF',
    highlight: '#9454D4',
    accent: '#A97BE0',
  },
  {
    title: 'Ship Anywhere',
    description: 'Global fulfillment. We handle logistics, you handle growth.',
    color: '#1E3A4A',
    fabric: '#2A4F62',
    highlight: '#3A6A80',
    accent: '#5A8FA5',
  },
]

const SHIRT_TILTS = [-2.5, 1.5, -1, 3]

function TShirtSVG({
  color,
  fabric,
  highlight,
  accent,
  index,
  label,
}: {
  color: string
  fabric: string
  highlight: string
  accent: string
  index: number
  label: string
}) {
  const id = `shirt-${index}`

  return (
    <svg
      viewBox="0 0 180 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Wood grain gradient for hanger */}
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor="#C4956A" />
          <stop offset="20%" stopColor="#A0724D" />
          <stop offset="40%" stopColor="#B8896040" />
          <stop offset="50%" stopColor="#8B6340" />
          <stop offset="70%" stopColor="#A07850" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        {/* Hanger wood highlight */}
        <linearGradient id={`${id}-wood-hi`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,220,180,0.5)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Metal hook gradient */}
        <linearGradient id={`${id}-hook`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="40%" stopColor="#808080" />
          <stop offset="60%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        {/* Fabric body gradient */}
        <linearGradient id={`${id}-fabric`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="30%" stopColor={fabric} />
          <stop offset="70%" stopColor={color} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        {/* Fabric light catch on left shoulder */}
        <radialGradient id={`${id}-sheen`} cx="0.3" cy="0.15" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Shadow on right side for depth */}
        <linearGradient id={`${id}-depth`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="80%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        {/* Noise texture */}
        <filter id={`${id}-grain`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="overlay" />
        </filter>
        {/* Drop shadow */}
        <filter id={`${id}-shadow`} x="-15%" y="-5%" width="130%" height="115%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
        </filter>
      </defs>

      {/* === WOODEN HANGER === */}
      {/* Metal hook */}
      <path
        d="M90 0 C90 0, 90 10, 90 10 C90 10, 86 10, 84 14 C82 18, 84 22, 90 22"
        stroke={`url(#${id}-hook)`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hook shine */}
      <path
        d="M89 1 L89 9"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Hanger body - wooden bar */}
      <path
        d="M38 34 Q42 24, 90 22 Q138 24, 142 34"
        stroke={`url(#${id}-wood)`}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hanger highlight */}
      <path
        d="M42 30 Q90 20, 138 30"
        stroke={`url(#${id}-wood-hi)`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hanger notches at ends */}
      <circle cx="38" cy="34" r="3" fill="#8B6340" />
      <circle cx="142" cy="34" r="3" fill="#8B6340" />

      {/* === T-SHIRT === */}
      <g filter={`url(#${id}-shadow)`}>
        {/* Main shirt body - natural drape with asymmetry */}
        <path
          d={`
            M38 36
            L16 54
            C14 56, 14 60, 16 62
            L30 72
            C32 73, 34 72, 34 70
            L40 58
            L39 220
            C39 224, 42 226, 46 226
            L132 228
            C136 228, 139 226, 139 222
            L140 58
            L146 70
            C146 72, 148 73, 150 72
            L164 62
            C166 60, 166 56, 164 54
            L142 36
            C132 28, 110 25, 90 25
            C70 25, 48 28, 38 36
            Z
          `}
          fill={`url(#${id}-fabric)`}
        />

        {/* Fabric grain overlay */}
        <path
          d={`
            M38 36 L16 54 C14 56,14 60,16 62 L30 72 C32 73,34 72,34 70
            L40 58 L39 220 C39 224,42 226,46 226 L132 228
            C136 228,139 226,139 222 L140 58 L146 70 C146 72,148 73,150 72
            L164 62 C166 60,166 56,164 54 L142 36
            C132 28,110 25,90 25 C70 25,48 28,38 36 Z
          `}
          fill={`url(#${id}-fabric)`}
          filter={`url(#${id}-grain)`}
          opacity="0.35"
        />

        {/* Light sheen */}
        <path
          d={`
            M38 36 L16 54 C14 56,14 60,16 62 L30 72 C32 73,34 72,34 70
            L40 58 L39 220 C39 224,42 226,46 226 L132 228
            C136 228,139 226,139 222 L140 58 L146 70 C146 72,148 73,150 72
            L164 62 C166 60,166 56,164 54 L142 36
            C132 28,110 25,90 25 C70 25,48 28,38 36 Z
          `}
          fill={`url(#${id}-sheen)`}
        />

        {/* Right-side depth shadow */}
        <path
          d={`
            M38 36 L16 54 C14 56,14 60,16 62 L30 72 C32 73,34 72,34 70
            L40 58 L39 220 C39 224,42 226,46 226 L132 228
            C136 228,139 226,139 222 L140 58 L146 70 C146 72,148 73,150 72
            L164 62 C166 60,166 56,164 54 L142 36
            C132 28,110 25,90 25 C70 25,48 28,38 36 Z
          `}
          fill={`url(#${id}-depth)`}
        />

        {/* Collar / neckline */}
        <path
          d="M68 30 C72 40, 82 44, 90 44 C98 44, 108 40, 112 30"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner collar shadow */}
        <path
          d="M72 32 C76 39, 84 42, 90 42 C96 42, 104 39, 108 32"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="3"
          fill="none"
        />

        {/* Wrinkle / fold lines */}
        <path
          d="M55 80 C60 82, 58 90, 54 95"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M125 85 C120 88, 122 96, 126 100"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M70 180 C75 182, 80 178, 85 180"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M95 190 C100 192, 108 188, 115 191"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
          fill="none"
        />

        {/* Seam lines (subtle) */}
        <line
          x1="40"
          y1="58"
          x2="39"
          y2="220"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="0.5"
        />
        <line
          x1="140"
          y1="58"
          x2="139"
          y2="222"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="0.5"
        />

        {/* === TEXT PRINTED ON SHIRT === */}
        <text
          x="90"
          y="140"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="800"
          fontSize="16"
          fill={accent}
          opacity="0.9"
          transform="rotate(-1, 90, 140)"
        >
          {label.split(' ').length <= 2 ? (
            <tspan>{label}</tspan>
          ) : (
            <>
              <tspan x="90" dy="0">
                {label.split(' ').slice(0, -1).join(' ')}
              </tspan>
              <tspan x="90" dy="20">
                {label.split(' ').slice(-1)}
              </tspan>
            </>
          )}
        </text>
        {/* Text shadow to simulate print depth */}
        <text
          x="90.5"
          y="140.5"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="800"
          fontSize="16"
          fill="rgba(0,0,0,0.15)"
          transform="rotate(-1, 90, 140)"
        >
          {label.split(' ').length <= 2 ? (
            <tspan>{label}</tspan>
          ) : (
            <>
              <tspan x="90.5" dy="0">
                {label.split(' ').slice(0, -1).join(' ')}
              </tspan>
              <tspan x="90.5" dy="20">
                {label.split(' ').slice(-1)}
              </tspan>
            </>
          )}
        </text>
      </g>
    </svg>
  )
}

function RackStructure() {
  return (
    <svg
      viewBox="0 0 800 420"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Black matte metal */}
        <linearGradient id="rack-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="50%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#2A2A2A" />
        </linearGradient>
        {/* Metal pipe highlight */}
        <linearGradient id="rack-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Vertical pipe gradient */}
        <linearGradient id="rack-vert" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="30%" stopColor="#3A3A3A" />
          <stop offset="50%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        <filter id="rack-drop">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.2)" />
        </filter>
      </defs>

      <g filter="url(#rack-drop)">
        {/* Left vertical leg */}
        <rect x="80" y="40" width="10" height="360" rx="5" fill="url(#rack-vert)" />
        <rect x="80" y="40" width="4" height="360" rx="2" fill="url(#rack-highlight)" />

        {/* Right vertical leg */}
        <rect x="710" y="40" width="10" height="360" rx="5" fill="url(#rack-vert)" />
        <rect x="710" y="40" width="4" height="360" rx="2" fill="url(#rack-highlight)" />

        {/* Top horizontal bar */}
        <rect x="75" y="40" width="650" height="10" rx="5" fill="url(#rack-metal)" />
        {/* Bar top highlight */}
        <rect
          x="75"
          y="40"
          width="650"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.12)"
        />

        {/* Bottom base bar */}
        <rect x="60" y="395" width="680" height="8" rx="4" fill="url(#rack-metal)" />
        <rect
          x="60"
          y="395"
          width="680"
          height="2.5"
          rx="1.25"
          fill="rgba(255,255,255,0.08)"
        />

        {/* Left foot */}
        <rect x="55" y="390" width="40" height="12" rx="4" fill="#1A1A1A" />
        {/* Right foot */}
        <rect x="705" y="390" width="40" height="12" rx="4" fill="#1A1A1A" />
      </g>
    </svg>
  )
}

const swingOnHover = {
  rotate: [0, -5, 3, -2, 1, 0],
  transition: {
    duration: 1,
    ease: 'easeInOut',
  },
}

export default function ClothesLine() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getShirtX = (i: number) => {
    if (hoveredIndex === null) return 0
    if (i === hoveredIndex) return 0
    if (i < hoveredIndex) return -28
    return 28
  }

  return (
    <section data-testid="clothes-line" className="relative w-full py-20 overflow-hidden">
      {/* Background: showroom feel */}
      <div className="absolute inset-0">
        {/* Light wall */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #FAFAFA 0%, #F5F3F0 60%, #EDE8E2 100%)',
          }}
        />
        {/* Subtle warm vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 50%, rgba(0,0,0,0.03) 100%)',
          }}
        />
        {/* Faint wood floor at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(180,150,120,0.08) 40%, rgba(160,130,100,0.15) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '-0.03em',
            color: '#1A1A1A',
          }}
        >
          Why DripCloud
        </h2>

        {/* === DESKTOP RACK === */}
        <div className="hidden md:block">
          <div
            className="relative mx-auto"
            style={{
              perspective: '1200px',
              maxWidth: '800px',
            }}
          >
            <div
              style={{
                transform: 'rotateY(-4deg)',
                transformStyle: 'preserve-3d',
                position: 'relative',
                height: '500px',
              }}
            >
              {/* The rack structure */}
              <RackStructure />

              {/* Shirts hanging on the bar */}
              <div
                className="absolute flex items-start justify-center"
                style={{
                  top: '20px',
                  left: '120px',
                  right: '120px',
                  height: '340px',
                }}
              >
                {SELLING_POINTS.map((point, i) => {
                  const isHovered = hoveredIndex === i
                  const spacing = 130
                  const startX = -(SELLING_POINTS.length - 1) * spacing * 0.5
                  const baseX = startX + i * spacing

                  return (
                    <motion.div
                      key={i}
                      className="absolute cursor-pointer"
                      style={{
                        width: '170px',
                        height: '320px',
                        transformOrigin: 'top center',
                        left: '50%',
                        zIndex: isHovered ? 20 : 10 - Math.abs(i - 1.5),
                      }}
                      animate={{
                        x: baseX + getShirtX(i),
                        rotate: isHovered ? 0 : SHIRT_TILTS[i],
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -10 : 0,
                      }}
                      whileHover={swingOnHover}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 18,
                        mass: 0.8,
                      }}
                      onHoverStart={() => setHoveredIndex(i)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <div
                        className="w-full h-full transition-[filter] duration-300"
                        style={{
                          marginLeft: '-50%',
                          filter: isHovered
                            ? 'drop-shadow(0 16px 32px rgba(0,0,0,0.2))'
                            : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        }}
                      >
                        <TShirtSVG
                          color={point.color}
                          fabric={point.fabric}
                          highlight={point.highlight}
                          accent={point.accent}
                          index={i}
                          label={point.title}
                        />
                      </div>

                      {/* Info card */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute w-60 rounded-xl p-4"
                            style={{
                              top: '100%',
                              left: '50%',
                              marginLeft: '-170px',
                              marginTop: '-16px',
                              background: 'rgba(255, 255, 255, 0.88)',
                              backdropFilter: 'blur(16px)',
                              WebkitBackdropFilter: 'blur(16px)',
                              border: '1px solid rgba(255, 255, 255, 0.5)',
                              boxShadow:
                                '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          >
                            {/* Accent bar */}
                            <div
                              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                              style={{ background: point.accent }}
                            />
                            <div className="pl-3">
                              <h3
                                className="font-bold text-gray-900 text-sm mb-1"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {point.title}
                              </h3>
                              <p
                                className="text-gray-500 text-xs leading-relaxed"
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                }}
                              >
                                {point.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* === MOBILE: horizontal scroll === */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto pb-6 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {SELLING_POINTS.map((point, i) => (
              <motion.div
                key={i}
                className="snap-center flex-shrink-0 flex flex-col items-center"
                style={{ width: '160px' }}
                whileTap={{ scale: 0.97 }}
                onTapStart={() =>
                  setHoveredIndex(hoveredIndex === i ? null : i)
                }
              >
                <div
                  className="w-[140px] h-[200px]"
                  style={{
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))',
                    transform: `rotate(${SHIRT_TILTS[i]}deg)`,
                  }}
                >
                  <TShirtSVG
                    color={point.color}
                    fabric={point.fabric}
                    highlight={point.highlight}
                    accent={point.accent}
                    index={i + 10}
                    label={point.title}
                  />
                </div>
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      className="mt-2 w-full rounded-xl p-3"
                      style={{
                        background: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                        style={{ background: point.accent }}
                      />
                      <div className="pl-3">
                        <h3 className="font-bold text-gray-900 text-xs mb-0.5">
                          {point.title}
                        </h3>
                        <p className="text-gray-500 text-[11px] leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
