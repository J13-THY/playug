import { useNavigate } from 'react-router-dom'

export default function TournamentRedBull() {
  const navigate = useNavigate()
  const players = 192
  const maxPlayers = 256
  const pct = Math.round((players / maxPlayers) * 100)

  return (
    <main className="main-content">
      <div className="tourney-page">

        {/* Hero */}
        <div
          className="tourney-hero"
          style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 40%, #CC0000 100%)' }}
        >
          <button className="tourney-back-btn" onClick={() => navigate('/arcade')}>
            ← Back to Arcade
          </button>
          <p className="tourney-brand" style={{ color: '#FFD700' }}>Red Bull</p>
          <h1 className="tourney-hero-title">Red Bull Quiz Blitz</h1>
          <p className="tourney-tagline">Red Bull Gives You Wings to Win</p>
          <div className="tourney-hero-stats">
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">UGX 1,500,000</span>
              <span className="tourney-hero-stat-label">Prize Pool</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">192</span>
              <span className="tourney-hero-stat-label">Players Joined</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">1d 8h</span>
              <span className="tourney-hero-stat-label">Time Left</span>
            </div>
          </div>
        </div>

        <div className="tourney-body">

          {/* About */}
          <h2 className="tourney-section-title">About This Tournament</h2>
          <div className="tourney-about">
            <p>
              Red Bull fuels performance. The Red Bull Quiz Blitz tests your knowledge, speed and
              mental agility under pressure. Only the sharpest minds rise to the top. Spanning
              science, history, sports, pop culture and more — this is the ultimate test of what
              you know and how fast you can think. Do you have what it takes?
            </p>
          </div>

          {/* Prizes */}
          <h2 className="tourney-section-title">Prizes</h2>
          <div className="tourney-prizes">
            <div className="tourney-prize-card gold">
              <span className="tourney-prize-medal">🥇</span>
              <span className="tourney-prize-place">1st Place</span>
              <span className="tourney-prize-amount">UGX 750,000</span>
              <span className="tourney-prize-extra">+ Red Bull Year Supply + Merchandise Pack</span>
            </div>
            <div className="tourney-prize-card silver">
              <span className="tourney-prize-medal">🥈</span>
              <span className="tourney-prize-place">2nd Place</span>
              <span className="tourney-prize-amount">UGX 450,000</span>
              <span className="tourney-prize-extra">+ 6-Month Supply + Merch</span>
            </div>
            <div className="tourney-prize-card bronze">
              <span className="tourney-prize-medal">🥉</span>
              <span className="tourney-prize-place">3rd Place</span>
              <span className="tourney-prize-amount">UGX 150,000</span>
              <span className="tourney-prize-extra">+ Red Bull Merch Pack</span>
            </div>
          </div>

          {/* Games */}
          <h2 className="tourney-section-title">Featured Games</h2>
          <div className="tourney-games">
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🧠</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Quiz Battles</p>
                <p className="tourney-game-desc">Head-to-head trivia battles — first to answer correctly wins the round.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">➕</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Math Duels</p>
                <p className="tourney-game-desc">Race to solve equations faster than your opponent — speed and accuracy matter.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">⌨️</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Typing Speed Battle</p>
                <p className="tourney-game-desc">Who's the fastest typist? Prove your speed under tournament pressure.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🧩</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Puzzle Racing</p>
                <p className="tourney-game-desc">Solve complex puzzles faster than your rivals to advance in the bracket.</p>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <h2 className="tourney-section-title">How to Join</h2>
          <div className="tourney-steps">
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#CC0000' }}>1</div>
              <p className="tourney-step-text">Log in to LudoChampion or create a free account in seconds.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#CC0000' }}>2</div>
              <p className="tourney-step-text">Tap "Join Tournament" to lock in your spot — only 256 players maximum.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#CC0000' }}>3</div>
              <p className="tourney-step-text">Brush up on your general knowledge — topics span science, sports, history, and culture.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#CC0000' }}>4</div>
              <p className="tourney-step-text">Compete in rapid-fire rounds — every second counts. Correct and fast answers score highest.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#CC0000' }}>5</div>
              <p className="tourney-step-text">Top 3 players receive cash prizes via mobile money and Red Bull merchandise delivered to you.</p>
            </div>
          </div>

          {/* Participants */}
          <h2 className="tourney-section-title">Participants</h2>
          <div className="tourney-participants">
            <div className="tourney-part-nums">
              <span className="tourney-part-registered">{players.toLocaleString()} registered</span>
              <span className="tourney-part-max">/ {maxPlayers.toLocaleString()} max</span>
            </div>
            <div className="tourney-part-track">
              <div
                className="tourney-part-fill"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #CC0000, #FFD700)' }}
              />
            </div>
            <p className="tourney-part-label">{pct}% full — {(maxPlayers - players).toLocaleString()} spots remaining</p>
          </div>

          {/* CTA */}
          <button
            className="tourney-cta"
            style={{ background: 'linear-gradient(135deg, #CC0000, #8B0000)', color: '#FFFFFF' }}
            onClick={() => alert('Tournament registration coming soon!')}
          >
            Join Tournament — Red Bull Quiz Blitz
          </button>

        </div>
      </div>
    </main>
  )
}
