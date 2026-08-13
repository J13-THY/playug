import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { WorldMap } from '../components/WorldMap'

const STATS = [
  { num: '180K+', label: 'Active Players' },
  { num: '12+',   label: 'Countries' },
  { num: '50K+',  label: 'Matches Daily' },
  { num: '#1',    label: 'Africa Gaming' },
  { num: '500+',  label: 'Tournaments' },
  { num: '24/7',  label: 'Live Games' },
]

function MarqueeStats() {
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)
  const scrollRef = useRef(null)
  const resumeTimer = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setPaused(true)
    clearTimeout(resumeTimer.current)
  }

  const handleTouchEnd = () => {
    resumeTimer.current = setTimeout(() => setPaused(false), 2000)
  }

  return (
    <div
      className="comm-onboard-marquee-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="comm-onboard-marquee"
        ref={scrollRef}
        style={{ overflowX: paused ? 'auto' : 'hidden' }}
      >
        <div
          className="comm-onboard-marquee-track"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {[...STATS, ...STATS].map((s, i) => (
            <div key={i} className="comm-onboard-marquee-item">
              <span className="comm-onboard-stat-num">{s.num}</span>
              <span className="comm-onboard-stat-lbl">{s.label}</span>
              <span className="comm-onboard-marquee-dot">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DOTS = [
  { start: { lat: 0.3476, lng: 32.5825, label: 'Kampala' },   end: { lat: -1.2921, lng: 36.8219, label: 'Nairobi' } },
  { start: { lat: -1.2921, lng: 36.8219, label: 'Nairobi' },  end: { lat: 6.5244,  lng: 3.3792,  label: 'Lagos' } },
  { start: { lat: 6.5244,  lng: 3.3792,  label: 'Lagos' },    end: { lat: -26.2041, lng: 28.0473, label: 'Johannesburg' } },
  { start: { lat: 0.3476, lng: 32.5825,  label: 'Kampala' },  end: { lat: 51.5074, lng: -0.1278,  label: 'London' } },
  { start: { lat: 51.5074, lng: -0.1278, label: 'London' },   end: { lat: 40.7128, lng: -74.006,  label: 'New York' } },
  { start: { lat: 0.3476, lng: 32.5825,  label: 'Kampala' },  end: { lat: 25.2048, lng: 55.2708,  label: 'Dubai' } },
]

export default function CommunityOnboardingPage() {
  const navigate = useNavigate()

  return (
    <main className="main-content">
      <div className="comm-onboard-page">

        {/* Hero — text floats above map, blending into it */}
        <motion.div
          className="comm-onboard-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Map sits at bottom of hero */}
          <div className="comm-onboard-map-wrap">
            <WorldMap dots={DOTS} lineColor="#0a84ff" />
          </div>

          {/* Top-to-map gradient fade */}
          <div className="comm-onboard-map-fade" />

          {/* Text overlaid on top */}
          <motion.div
            className="comm-onboard-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="comm-onboard-tag">🌍 wePlay-UG Community</span>
            <h1 className="comm-onboard-title">
              Connect with Players<br />Across the Globe
            </h1>
            <p className="comm-onboard-sub">
              Challenge friends in Kampala, join clan wars with players in Lagos,
              and compete in tournaments watched from London to Dubai.
              The world plays together on wePlay-UG.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats marquee — scrolls right to left, touch-scrollable on mobile */}
        <MarqueeStats />

        {/* Features */}
        <motion.div
          className="comm-onboard-features"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {[
            { icon: '⚔️', title: 'Challenge Friends',   desc: 'Send match invites to anyone, anywhere, instantly.' },
            { icon: '🏆', title: 'Join Clans',           desc: 'Form teams, compete in clan wars, climb leaderboards.' },
            { icon: '💬', title: 'Live Chat',            desc: 'Talk trash, celebrate wins, and make new rivals.' },
            { icon: '🎯', title: 'Daily Tournaments',   desc: 'Jump into tournaments every day with real cash prizes.' },
          ].map(f => (
            <div key={f.title} className="comm-onboard-feature">
              <span className="comm-onboard-feature-icon">{f.icon}</span>
              <div>
                <p className="comm-onboard-feature-title">{f.title}</p>
                <p className="comm-onboard-feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="comm-onboard-cta-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            className="comm-onboard-cta"
            onClick={() => navigate('/community/feed')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Go 🚀
          </motion.button>
          <p className="comm-onboard-cta-note">Free to join · No credit card required</p>
        </motion.div>

      </div>
    </main>
  )
}
