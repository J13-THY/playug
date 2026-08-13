import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DottedMap from 'dotted-map'
import { useTheme } from '../context/ThemeContext'

export function WorldMap({ dots = [], lineColor = '#0a84ff', animationDuration = 2, loop = true }) {
  const svgRef = useRef(null)
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const { theme } = useTheme()

  const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), [])

  const svgMap = useMemo(() => map.getSVG({
    radius: 0.32,
    color: theme === 'dark' ? '#4a9eff55' : '#1a4a8a40',
    shape: 'circle',
    backgroundColor: 'transparent',
  }), [map, theme])

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  })

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

  return (
    <div style={{ width: '100%', aspectRatio: '2/1', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="world map"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)',
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wm-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"    stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"    stopOpacity="0" />
          </linearGradient>
          <filter id="wm-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng)
          const e = projectPoint(dot.end.lat, dot.end.lng)
          const path = createCurvedPath(s, e)
          const startT = (i * staggerDelay) / fullCycleDuration
          const endT   = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetT = totalAnimationTime / fullCycleDuration

          return (
            <g key={i}>
              <motion.path
                d={path} fill="none"
                stroke="url(#wm-path-grad)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={loop ? {
                  duration: fullCycleDuration,
                  times: [0, startT, endT, resetT, 1],
                  ease: 'easeInOut', repeat: Infinity,
                } : { duration: animationDuration, delay: i * staggerDelay, ease: 'easeInOut' }}
              />
              {[s, e].map((pt, pi) => (
                <g key={pi}
                  onMouseEnter={() => setHoveredLocation(pi === 0 ? dot.start.label : dot.end.label)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={pt.x} cy={pt.y} r="3" fill={lineColor} filter="url(#wm-glow)" />
                  <circle cx={pt.x} cy={pt.y} r="3" fill={lineColor} opacity="0.4">
                    <animate attributeName="r" from="3" to="10" dur="2s" begin={`${pi * 0.5}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin={`${pi * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  {(pi === 0 ? dot.start.label : dot.end.label) && (
                    <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="9" fill={lineColor} opacity="0.85">
                      {pi === 0 ? dot.start.label : dot.end.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            style={{
              position: 'absolute', bottom: 12, left: 12,
              background: 'rgba(0,0,0,0.85)', color: '#fff',
              padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
