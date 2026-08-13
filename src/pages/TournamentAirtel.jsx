import { useNavigate } from 'react-router-dom'

export default function TournamentAirtel() {
  const navigate = useNavigate()
  const players = 420
  const maxPlayers = 512
  const pct = Math.round((players / maxPlayers) * 100)

  return (
    <main className="main-content">
      <div className="tourney-page">

        {/* Hero */}
        <div
          className="tourney-hero"
          style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF0000 50%, #CC0000 100%)' }}
        >
          <button className="tourney-back-btn" onClick={() => navigate('/arcade')}>
            ← Back to Arcade
          </button>
          <p className="tourney-brand" style={{ color: '#FFCCCC' }}>Airtel Uganda</p>
          <h1 className="tourney-hero-title">Airtel Draughts League</h1>
          <p className="tourney-tagline">Connect. Compete. Conquer.</p>
          <div className="tourney-hero-stats">
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">UGX 2,000,000</span>
              <span className="tourney-hero-stat-label">Prize Pool</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">420</span>
              <span className="tourney-hero-stat-label">Players Joined</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">4d 2h</span>
              <span className="tourney-hero-stat-label">Time Left</span>
            </div>
          </div>
        </div>

        <div className="tourney-body">

          {/* About */}
          <h2 className="tourney-section-title">About This Tournament</h2>
          <div className="tourney-about">
            <p>
              Airtel Uganda connects millions across the country. The Airtel Draughts League celebrates
              strategic thinking and competitive spirit across Uganda. Open to all players, this tournament
              rewards those who can plan ahead, adapt under pressure, and outmaneuver their opponents
              on the board. Registration is still open — secure your spot today.
            </p>
          </div>

          {/* Prizes */}
          <h2 className="tourney-section-title">Prizes</h2>
          <div className="tourney-prizes">
            <div className="tourney-prize-card gold">
              <span className="tourney-prize-medal">🥇</span>
              <span className="tourney-prize-place">1st Place</span>
              <span className="tourney-prize-amount">UGX 1,000,000</span>
              <span className="tourney-prize-extra">+ Airtel 4G Router{'\n'}+ 100GB Data</span>
            </div>
            <div className="tourney-prize-card silver">
              <span className="tourney-prize-medal">🥈</span>
              <span className="tourney-prize-place">2nd Place</span>
              <span className="tourney-prize-amount">UGX 600,000</span>
              <span className="tourney-prize-extra">+ 50GB Data Bundle</span>
            </div>
            <div className="tourney-prize-card bronze">
              <span className="tourney-prize-medal">🥉</span>
              <span className="tourney-prize-place">3rd Place</span>
              <span className="tourney-prize-amount">UGX 200,000</span>
              <span className="tourney-prize-extra">+ 20GB Data Bundle</span>
            </div>
          </div>

          {/* Games */}
          <h2 className="tourney-section-title">Featured Games</h2>
          <div className="tourney-games">
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🔴</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Draughts Champion</p>
                <p className="tourney-game-desc">The flagship game of this tournament — master the board and claim victory.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🎱</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Pool Master</p>
                <p className="tourney-game-desc">Precision and strategy meet in this digital pool hall challenge.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">⌨️</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Typing Speed Battle</p>
                <p className="tourney-game-desc">Race against opponents to see who can type the fastest and most accurately.</p>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <h2 className="tourney-section-title">How to Join</h2>
          <div className="tourney-steps">
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#FF0000' }}>1</div>
              <p className="tourney-step-text">Sign in to LudoChampion — new players can register for free in under 30 seconds.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#FF0000' }}>2</div>
              <p className="tourney-step-text">Hit "Register" below to secure your spot — registration closes when 512 players join.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#FF0000' }}>3</div>
              <p className="tourney-step-text">Practice in the free play area to warm up before the tournament starts.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#FF0000' }}>4</div>
              <p className="tourney-step-text">Compete in the group stage, then advance to knockout rounds based on your rank.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#FF0000' }}>5</div>
              <p className="tourney-step-text">Prizes delivered via Airtel Money and physical delivery for hardware rewards.</p>
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
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #FF6600, #FF0000)' }}
              />
            </div>
            <p className="tourney-part-label">{pct}% full — {(maxPlayers - players).toLocaleString()} spots remaining</p>
          </div>

          {/* CTA */}
          <button
            className="tourney-cta"
            style={{ background: 'linear-gradient(135deg, #FF4500, #CC0000)', color: '#FFFFFF' }}
            onClick={() => alert('Tournament registration coming soon!')}
          >
            Register Now — Airtel Draughts League
          </button>

        </div>
      </div>
    </main>
  )
}
