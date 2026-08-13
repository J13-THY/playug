import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TODAY_CARDS } from '../data/todayCards'

const CATEGORIES = [
  { id: 'all',      label: 'All',      emoji: '🎮' },
  { id: 'ludo',     label: 'Ludo',     emoji: '🎲' },
  { id: 'chess',    label: 'Chess',    emoji: '♟️' },
  { id: 'draughts', label: 'Draughts', emoji: '⬤'  },
  { id: 'checkers', label: 'Checkers', emoji: '🔴' },
  { id: 'cards',    label: 'Cards',    emoji: '🃏' },
]

const FEATURED = [
  {
    id: 'ludo-cup',
    badge: 'HAPPENING NOW',
    badgeBlue: false,
    eventType: 'SPECIAL EVENT',
    title: 'Ludo World Cup',
    desc: 'Compete against players from across Africa and become the Ludo Champion!',
    bg: '/ludo-board.jpg',
    appIcon: '/dp.jpg',
    appName: 'Ludo Champion',
    appSub: 'Classic Board Game',
  },
  {
    id: 'chess-masters',
    badge: 'NOW AVAILABLE',
    badgeBlue: true,
    eventType: 'NEW RELEASE',
    title: 'Chess Grand Masters',
    desc: "The ultimate chess tournament is here. Can you beat Uganda's finest?",
    bg: '/chess.jpg',
    appIcon: '/dp.jpg',
    appName: 'Chess Master Pro',
    appSub: 'Strategy Board Game',
  },
  {
    id: 'checkers-league',
    badge: 'HAPPENING NOW',
    badgeBlue: false,
    eventType: 'TOURNAMENT',
    title: 'Draughts African League',
    desc: 'Join the biggest Draughts tournament on the continent. Glory awaits.',
    bg: '/checkers.jpg',
    appIcon: '/dp.jpg',
    appName: 'Draughts Champion',
    appSub: 'Classic Board Game',
  },
]

const WHAT_PLAYING = [
  { name: 'Ludo Champion',    sub: 'Classic Board Game', grad: ['#667eea','#764ba2'], img: '/dp.jpg' },
  { name: 'Chess Master Pro', sub: 'Strategy Game',      grad: ['#f093fb','#f5576c'], img: '/dp.jpg' },
  { name: 'Draughts',         sub: 'Board Game',         grad: ['#4facfe','#00f2fe'], img: '/dp.jpg' },
  { name: 'Pool Master',      sub: 'Sports Game',        grad: ['#43e97b','#38f9d7'], img: '/dp.jpg' },
  { name: 'Quiz Battles',     sub: 'Trivia Game',        grad: ['#fa709a','#fee140'], img: '/dp.jpg' },
]

export default function GamesDiscoverPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [slide, setSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => changeSlide(s => (s + 1) % FEATURED.length), 7000)
  }

  const changeSlide = (getNext) => {
    setSlide(cur => {
      const next = typeof getNext === 'function' ? getNext(cur) : getNext
      if (next === cur) return cur
      setPrevSlide(cur)
      setTransitioning(true)
      setTimeout(() => { setTransitioning(false); setPrevSlide(null) }, 800)
      return next
    })
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goSlide = (i) => { changeSlide(() => (i + FEATURED.length) % FEATURED.length); startTimer() }
  const prev = () => goSlide(slide - 1)
  const next = () => goSlide(slide + 1)

  const current = FEATURED[slide]
  const previous = prevSlide !== null ? FEATURED[prevSlide] : null

  return (
    <main className="main-content gd-main">

      {/* ── Ambient background layers ── */}
      <div className="gd-ambient-wrap">
        {/* Outgoing layer — fades out */}
        {previous && (
          <div
            className="gd-ambient-layer gd-ambient-out"
            style={{ backgroundImage: `url(${previous.bg})` }}
          />
        )}
        {/* Active layer — fades in */}
        <div
          key={slide}
          className={`gd-ambient-layer gd-ambient-in${transitioning ? ' entering' : ' visible'}`}
          style={{ backgroundImage: `url(${current.bg})` }}
        />
        {/* Vignette + dark overlay */}
        <div className="gd-ambient-vignette" />
      </div>

      <div className="gd-page">

        <div className="gd-header-row">
          <h1 className="gd-title" style={{ padding: 0 }}>Games</h1>

          {/* Glowing search bar */}
          <div className="gd-glow-wrap">
            <div className="gd-glow-border gd-glow-border-1" />
            <div className="gd-glow-border gd-glow-border-2" />
            <div className="gd-glow-inner">
              <svg className="gd-glow-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6"/>
                <path d="M10.5 10.5L14 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                placeholder="Search..."
                className="gd-glow-input"
              />
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="gd-categories">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`gd-cat-pill${activeCategory === c.id ? ' active' : ''}`}
              onClick={() => {
                setActiveCategory(c.id)
                if (c.id === 'draughts') navigate('/games/draughts')
                if (c.id === 'checkers') navigate('/games/draughts')
              }}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Featured hero card */}
        <div
          className="gd-hero-card"
          onClick={() => navigate(`/games/event/${current.id}`)}
          onTouchStart={e => { window._gdTouchX = e.touches[0].clientX }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - (window._gdTouchX || 0)
            if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
          }}
        >
          {/* Crossfade background images inside card */}
          {previous && (
            <div className="gd-hero-bg gd-hero-bg-out" style={{ backgroundImage: `url(${previous.bg})` }} />
          )}
          <div
            key={slide}
            className={`gd-hero-bg${transitioning ? ' gd-hero-bg-entering' : ''}`}
            style={{ backgroundImage: `url(${current.bg})` }}
          />
          <div className="gd-hero-overlay" />

          <div className="gd-hero-content">
            <span className={`gd-hero-badge${current.badgeBlue ? ' blue' : ''}`}>{current.badge}</span>
            <div className="gd-hero-text">
              <p className="gd-hero-event">{current.eventType}</p>
              <h2 className="gd-hero-title">{current.title}</h2>
              <p className="gd-hero-desc">{current.desc}</p>
            </div>
            <div className="gd-hero-footer">
              <img src={current.appIcon} alt={current.appName} className="gd-hero-icon" />
              <div className="gd-hero-app-info">
                <span className="gd-hero-app-name">{current.appName}</span>
                <span className="gd-hero-app-sub">{current.appSub}</span>
              </div>
              <button className="gd-hero-view-btn" onClick={e => { e.stopPropagation(); navigate(`/games/event/${current.id}`) }}>View</button>
            </div>
          </div>

          <div className="gd-dots">
            {FEATURED.map((_, i) => (
              <button key={i} className={`gd-dot${slide === i ? ' active' : ''}`} onClick={e => { e.stopPropagation(); goSlide(i) }} />
            ))}
          </div>
        </div>

        {/* What We're Playing */}
        <div className="gd-section-header">
          <h2 className="gd-section-title">What We're Playing</h2>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'var(--text-muted)'}}><path d="M10 6l6 6-6 6"/></svg>
        </div>
        <div className="gd-playing-list">
          {WHAT_PLAYING.map((g, i) => (
            <button key={i} className="gd-playing-row" onClick={() => navigate('/games/ludo')}>
              <div className="gd-playing-icon" style={{ background: `linear-gradient(135deg,${g.grad[0]},${g.grad[1]})` }}>
                <img src={g.img} alt={g.name} />
              </div>
              <div className="gd-playing-info">
                <span className="gd-playing-name">{g.name}</span>
                <span className="gd-playing-sub">{g.sub}</span>
              </div>
              <button className="gd-playing-view" onClick={e => { e.stopPropagation(); navigate('/games/ludo') }}>View</button>
            </button>
          ))}
        </div>

        {/* Today */}
        <div className="gd-section-header" style={{ marginTop: 12 }}>
          <h2 className="gd-section-title">Today</h2>
        </div>
        <div className="today-grid" style={{ padding: '0 24px' }}>
          {TODAY_CARDS.map((card) => (
            <div key={card.title} className="today-card">
              <div className="today-card-image">
                <img src={card.image} alt={card.appName} className="card-bg-img" />
                <div className={`today-badge${card.badgeBlue ? ' blue' : ''}`}>{card.badge}</div>
                <div className="today-card-overlay">
                  <p className="today-event-type">{card.eventType}</p>
                  <h3 className="today-card-title">{card.title}</h3>
                  <p className="today-card-subtitle">{card.subtitle}</p>
                </div>
              </div>
              <div className="today-card-footer">
                <div className="today-app-info">
                  <div className="today-app-icon-small">
                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`grad-${card.appName}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: card.iconGradient[0] }} />
                          <stop offset="100%" style={{ stopColor: card.iconGradient[1] }} />
                        </linearGradient>
                      </defs>
                      <rect width="48" height="48" rx="10" fill={`url(#grad-${card.appName})`} />
                      <path d="M 24,10 L 20,15 L 18,20 L 20,25 L 18,30 L 28,30 L 26,25 L 28,20 L 26,15 Z" fill="#FFD700" />
                    </svg>
                  </div>
                  <div className="today-app-details">
                    <h4>{card.appName}</h4>
                    <p>{card.appCategory}</p>
                  </div>
                </div>
                <button className="today-view-btn">View</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
