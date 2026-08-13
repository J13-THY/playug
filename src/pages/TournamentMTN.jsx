import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=1200&q=80',
    headline: 'Uganda\'s Biggest Mobile Gaming Tournament',
    sub: 'Powered by MTN Mobile Money',
  },
  {
    bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    headline: 'Play Ludo. Win Millions.',
    sub: 'UGX 5,000,000 in prizes up for grabs',
  },
  {
    bg: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80',
    headline: 'Compete. Dominate. Get Paid.',
    sub: 'Winnings sent directly to your MTN MoMo',
  },
]

export default function TournamentMTN() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const players = 3200
  const maxPlayers = 4096
  const pct = Math.round((players / maxPlayers) * 100)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="main-content">
      <div className="tourney-page">

        {/* Hero with slideshow */}
        <div className="mtn-hero">
          {/* Slideshow backgrounds */}
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`mtn-slide${slide === i ? ' active' : ''}`}
              style={{ backgroundImage: `url(${s.bg})` }}
            />
          ))}

          {/* Faint MTN MoMo blue overlay */}
          <div className="mtn-overlay" />

          {/* Content */}
          <div className="mtn-hero-content">
            <button className="tourney-back-btn" onClick={() => navigate('/arcade')}>
              ← Back to Arcade
            </button>

            <div className="mtn-logo-row">
              <img
                src="https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo-footer.svg"
                alt="MTN"
                className="mtn-hero-logo"
              />
              <span className="mtn-hero-badge">OFFICIAL SPONSOR</span>
            </div>

            <h1 className="mtn-hero-title">{SLIDES[slide].headline}</h1>
            <p className="mtn-hero-sub">{SLIDES[slide].sub}</p>

            {/* Slide dots */}
            <div className="mtn-slide-dots">
              {SLIDES.map((_, i) => (
                <button key={i} className={`mtn-dot${slide === i ? ' active' : ''}`} onClick={() => setSlide(i)} />
              ))}
            </div>

            {/* Stats */}
            <div className="tourney-hero-stats" style={{ marginTop: 24 }}>
              <div className="tourney-hero-stat">
                <span className="tourney-hero-stat-num" style={{ color: '#FFCC00' }}>UGX 5,000,000</span>
                <span className="tourney-hero-stat-label">Prize Pool</span>
              </div>
              <div className="tourney-hero-stat">
                <span className="tourney-hero-stat-num" style={{ color: '#FFCC00' }}>3,200</span>
                <span className="tourney-hero-stat-label">Players Joined</span>
              </div>
              <div className="tourney-hero-stat">
                <span className="tourney-hero-stat-num" style={{ color: '#FFCC00' }}>2d 14h</span>
                <span className="tourney-hero-stat-label">Time Left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tourney-body">

          {/* About */}
          <h2 className="tourney-section-title">About This Tournament</h2>
          <div className="tourney-about">
            <p>
              MTN Uganda champions digital entertainment and youth empowerment. The MTN Pulse Ludo Cup
              brings together Uganda's best gaming talent for the ultimate mobile money prize pool.
              Compete across multiple game modes, climb the leaderboard, and claim your share of the
              biggest prize in Ugandan mobile gaming history.
            </p>
          </div>

          {/* Prizes */}
          <h2 className="tourney-section-title">Prizes</h2>
          <div className="tourney-prizes">
            <div className="tourney-prize-card gold">
              <span className="tourney-prize-medal">🥇</span>
              <span className="tourney-prize-place">1st Place</span>
              <span className="tourney-prize-amount">UGX 2,500,000</span>
              <span className="tourney-prize-extra">+ MTN Data Bundle 50GB</span>
            </div>
            <div className="tourney-prize-card silver">
              <span className="tourney-prize-medal">🥈</span>
              <span className="tourney-prize-place">2nd Place</span>
              <span className="tourney-prize-amount">UGX 1,500,000</span>
              <span className="tourney-prize-extra">+ 20GB Data Bundle</span>
            </div>
            <div className="tourney-prize-card bronze">
              <span className="tourney-prize-medal">🥉</span>
              <span className="tourney-prize-place">3rd Place</span>
              <span className="tourney-prize-amount">UGX 500,000</span>
              <span className="tourney-prize-extra">+ 10GB Data Bundle</span>
            </div>
          </div>

          {/* Games */}
          <h2 className="tourney-section-title">Featured Games</h2>
          <div className="tourney-games">
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🎲</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Ludo Champion</p>
                <p className="tourney-game-desc">The classic board game reimagined — roll, strategize, and dominate the board.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🧠</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Quiz Battles</p>
                <p className="tourney-game-desc">Test your knowledge across Uganda and Africa's most exciting trivia topics.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">♟️</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Draughts</p>
                <p className="tourney-game-desc">Classic draughts with a competitive twist — outmaneuver your opponents.</p>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <h2 className="tourney-section-title">How to Join</h2>
          <div className="tourney-steps">
            {[
              'Create or log in to your LudoChampion account.',
              'Tap "Join Tournament" below and confirm your entry with your MTN Mobile Money.',
              'Play your qualifying matches before the tournament begins.',
              'Compete in the bracket rounds and rise to the top of the leaderboard.',
              'Winners receive prizes directly to their MTN Mobile Money account within 24 hours.',
            ].map((text, i) => (
              <div key={i} className="tourney-step">
                <div className="tourney-step-num" style={{ background: '#FFCC00', color: '#000' }}>{i + 1}</div>
                <p className="tourney-step-text">{text}</p>
              </div>
            ))}
          </div>

          {/* Participants */}
          <h2 className="tourney-section-title">Participants</h2>
          <div className="tourney-participants">
            <div className="tourney-part-nums">
              <span className="tourney-part-registered">{players.toLocaleString()} registered</span>
              <span className="tourney-part-max">/ {maxPlayers.toLocaleString()} max</span>
            </div>
            <div className="tourney-part-track">
              <div className="tourney-part-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #FFCC00, #FF8C00)' }} />
            </div>
            <p className="tourney-part-label">{pct}% full — {(maxPlayers - players).toLocaleString()} spots remaining</p>
          </div>

          {/* CTA */}
          <button
            className="tourney-cta"
            style={{ background: 'linear-gradient(135deg, #FFCC00, #FF8C00)', color: '#000000' }}
            onClick={() => alert('Tournament registration coming soon!')}
          >
            Join Tournament — MTN Pulse Ludo Cup
          </button>

        </div>
      </div>
    </main>
  )
}
