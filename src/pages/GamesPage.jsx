import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReviewPopup from '../components/ReviewPopup'
import { REVIEWS } from '../data/reviews'
import { MORE_APPS } from '../data/moreApps'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

function RatingBar({ width }) {
  const animate = useCallback((el) => { el.style.width = width }, [width])
  const ref = useAnimateOnScroll(animate)
  return (
    <div className="bar">
      <div className="bar-fill" ref={ref} style={{ width: '0%', transition: 'width 1s ease' }} />
    </div>
  )
}

export default function GamesPage() {
  const navigate = useNavigate()
  const [activeReview, setActiveReview] = useState(null)
  const [shareLabel, setShareLabel] = useState('Share')
  const handleCloseReview = useCallback(() => setActiveReview(null), [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'LudoChampion', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setShareLabel('Copied!')
        setTimeout(() => setShareLabel('Share'), 2000)
      })
    }
  }

  return (
    <main className="main-content">
      <button className="account-back-btn" style={{ padding: '16px 24px 0' }} onClick={() => navigate('/games')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        Games
      </button>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="app-icon">
          <img src="/dp.jpg" alt="LudoChampion" />
        </div>
        <div className="hero-info">
          <h1 className="app-title">LUDOCHAMPION</h1>
          <p className="app-subtitle">Top Multiplayer Ludo Game</p>
          <p className="app-price">Free · In-App Purchases</p>
          <button className="share-btn" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0L10 12M10 0L6 4M10 0L14 4M2 12V18C2 19.1 2.9 20 4 20H16C17.1 20 18 19.1 18 18V12" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {shareLabel === 'Share' ? 'Play Now' : shareLabel}
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        {[
          { label: '1.6M RATINGS', main: <span className="stat-value-large">4.3</span>,                                                                                                              sub: <span className="stars">★★★★☆</span> },
          { label: 'AGE RATING',   main: <span className="stat-value-large">13+</span>,                                                                                                              sub: <span className="stat-sublabel">Years</span> },
          { label: 'CATEGORY',     main: <svg className="stat-icon" width="28" height="28" viewBox="0 0 40 40" fill="#a0a0a0"><path d="M20 4L4 12v12c0 9 6.5 17.5 15 19 8.5-1.5 15-10 15-19V12L20 4z"/></svg>, sub: <span className="stat-sublabel">Strategy</span> },
          { label: 'DEVELOPER',    main: <svg className="stat-icon" width="28" height="28" viewBox="0 0 40 40" fill="#a0a0a0"><circle cx="20" cy="15" r="7"/><path d="M6 32c0-6 6-10 14-10s14 4 14 10"/></svg>, sub: <span className="stat-sublabel">GameStudio</span> },
          { label: 'LANGUAGE',     main: <span className="stat-value-large">EN</span>,                                                                                                               sub: <span className="stat-sublabel">+ 12 More</span> },
          { label: 'SIZE',         main: <span className="stat-value-large">3.9</span>,                                                                                                              sub: <span className="stat-sublabel">GB</span> },
        ].map(({ label, main, sub }) => (
          <div key={label} className="stat-box">
            <span className="stat-label">{label}</span>
            <div className="stat-main">{main}</div>
            <div className="stat-sub">{sub}</div>
          </div>
        ))}
      </section>

      {/* Screenshots */}
      <section className="screenshots">
        <div className="screenshot-item">
          <img src="/ludo-board.jpg" alt="Classic Ludo Board" className="screenshot-photo" />
          <div className="screenshot-overlay">CLASSIC LUDO BOARD</div>
        </div>
        <div className="screenshot-item">
          <div className="screenshot-dice-bg" style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)' }}>
            <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f093fb' }} />
                  <stop offset="100%" style={{ stopColor: '#f5576c' }} />
                </linearGradient>
              </defs>
              <rect width="600" height="400" fill="url(#lg2)" />
              <circle cx="200" cy="200" r="40" fill="#FFD700" stroke="white" strokeWidth="4" />
              <circle cx="300" cy="150" r="40" fill="#4FACFE" stroke="white" strokeWidth="4" />
              <circle cx="400" cy="200" r="40" fill="#2ECC71" stroke="white" strokeWidth="4" />
              <circle cx="300" cy="250" r="40" fill="#FF6B6B" stroke="white" strokeWidth="4" />
              <text x="300" y="340" fontSize="36" fill="white" textAnchor="middle" fontWeight="bold">VS</text>
            </svg>
          </div>
          <div className="screenshot-overlay">MULTIPLAYER BATTLE</div>
        </div>
        <div className="screenshot-item screenshot-item--photo">
          <img src="/dice.jpg" alt="Dice Rolling Action" className="screenshot-photo" />
          <div className="screenshot-overlay">DICE ROLLING ACTION</div>
        </div>
      </section>

      {/* What's New */}
      <section className="section">
        <h2 className="section-title">
          What&apos;s New
          <svg className="chevron" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7 6l5 5-5 5"/></svg>
        </h2>
        <div className="whats-new-content">
          <p className="version-info">
            <span className="version">Version 4.4.0</span>
            <span className="date">May 12</span>
          </p>
          <p className="update-description">
            The first ancient Greek myth-themed version, Hero&apos;s Crown is here! Conquer the four temple areas, complete five glorious trials, and recruit the centaur ally to fight alongside you!
          </p>
          <div className="update-features">
            <h3>Battle Royale</h3>
            <ol>
              <li>New Themed Mode: Four Mysterious Areas × Five New Trials → Challenge and recruit the centaur ally, and compete with players worldwide!</li>
              <li>Season Updates: New season pass with exclusive rewards and customization options</li>
              <li>Performance Improvements: Enhanced graphics and smoother gameplay experience</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Ratings & Reviews */}
      <section className="section">
        <h2 className="section-title">
          Ratings &amp; Reviews
          <svg className="chevron" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7 6l5 5-5 5"/></svg>
        </h2>
        <div className="ratings-overview">
          <div className="rating-score">
            <div className="score-number">4.3</div>
            <div className="score-label">out of 5</div>
          </div>
          <div className="rating-bars">
            {[['★★★★★','65%'],['★★★★☆','20%'],['★★★☆☆','8%'],['★★☆☆☆','4%'],['★☆☆☆☆','3%']].map(([s,w]) => (
              <div key={s} className="rating-bar-row">
                <span className="stars-small">{s}</span>
                <RatingBar width={w} />
              </div>
            ))}
          </div>
          <div className="rating-count">1.6M Ratings</div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div key={r.title} className="review-card">
              <div className="review-header">
                <h4 className="review-title">{r.title}</h4>
                <div className="review-stars">{r.stars}</div>
              </div>
              <div className="review-meta">
                <span className="review-user">{r.user}</span>
                <span className="review-date">{r.date}</span>
              </div>
              <p className="review-text">{r.preview}</p>
              <button className="more-btn" onClick={() => setActiveReview(r)}>more</button>
            </div>
          ))}
        </div>
      </section>

      {/* App Privacy */}
      <section className="section">
        <h2 className="section-title">
          App Privacy
          <svg className="chevron" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7 6l5 5-5 5"/></svg>
        </h2>
        <p className="privacy-description">
          The developer, <strong>GameStudio International</strong>, indicated that the app&apos;s privacy practices may include handling of data as described below. For more information, see the{' '}
          <Link to="/privacy">developer&apos;s privacy policy</Link>.
        </p>
        <div className="privacy-cards">
          {[
            { title: 'Data Used to Track You', desc: 'The following data may be used to track you across apps and websites owned by other companies:', items: ['User Content', 'Identifiers'] },
            { title: 'Data Linked to You',     desc: 'The following data may be collected and linked to your identity:', items: ['Contact Info', 'User Content', 'Identifiers'] },
            { title: 'Data Not Linked to You', desc: 'The following data may be collected but it is not linked to your identity:', items: ['Usage Data', 'Diagnostics'] },
          ].map(({ title, desc, items }) => (
            <div key={title} className="privacy-card">
              <svg className="privacy-icon" width="50" height="50" viewBox="0 0 50 50" fill="currentColor">
                <path d="M25 5L10 12v12c0 9 6.5 17.5 15 19 8.5-1.5 15-10 15-19V12L25 5z"/>
              </svg>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Supports */}
      <section className="section">
        <h2 className="section-title">Supports</h2>
        <div className="supports-box">
          <svg className="support-icon" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="20" r="10" fill="url(#s1)"/>
            <circle cx="20" cy="35" r="10" fill="url(#s2)"/>
            <circle cx="40" cy="35" r="10" fill="url(#s3)"/>
            <defs>
              <linearGradient id="s1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B9D"/><stop offset="100%" stopColor="#C94FA7"/></linearGradient>
              <linearGradient id="s2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FEC163"/><stop offset="100%" stopColor="#DE4313"/></linearGradient>
              <linearGradient id="s3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5DDCFF"/><stop offset="100%" stopColor="#3C67E3"/></linearGradient>
            </defs>
          </svg>
          <div>
            <h3>Game Center</h3>
            <p>Discover new games and play with friends. This game also features leaderboards and achievements.</p>
          </div>
        </div>
      </section>

      {/* More by Developer */}
      <section className="section">
        <h2 className="section-title">
          More by GameStudio International
          <svg className="chevron" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M7 6l5 5-5 5"/></svg>
        </h2>
        <div className="more-apps">
          {MORE_APPS.map(({ name, category, grad }) => (
            <div key={name} className="app-row">
              <div className="app-small-icon">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id={`ag-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: grad[0] }} />
                      <stop offset="100%" style={{ stopColor: grad[1] }} />
                    </linearGradient>
                  </defs>
                  <rect width="64" height="64" rx="14" fill={`url(#ag-${name})`} />
                  <rect x="20" y="20" width="24" height="24" rx="4" fill="white" />
                </svg>
              </div>
              <div className="app-row-info">
                <h4>{name}</h4>
                <p className="app-row-category">{category}</p>
              </div>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
      </section>

      {/* Review popup */}
      {activeReview && <ReviewPopup review={activeReview} onClose={handleCloseReview} />}
    </main>
  )
}
