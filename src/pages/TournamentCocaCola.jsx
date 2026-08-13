import { useNavigate } from 'react-router-dom'

export default function TournamentCocaCola() {
  const navigate = useNavigate()
  const players = 890
  const maxPlayers = 1024
  const pct = Math.round((players / maxPlayers) * 100)

  return (
    <main className="main-content">
      <div className="tourney-page">

        {/* Hero */}
        <div
          className="tourney-hero"
          style={{ background: 'linear-gradient(135deg, #F40009 0%, #C00007 50%, #8B0000 100%)' }}
        >
          <button className="tourney-back-btn" onClick={() => navigate('/arcade')}>
            ← Back to Arcade
          </button>
          <p className="tourney-brand" style={{ color: '#FF9999' }}>Coca-Cola</p>
          <h1 className="tourney-hero-title">Coca-Cola Chess Masters</h1>
          <p className="tourney-tagline">Taste the Winning Feeling</p>
          <div className="tourney-hero-stats">
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">UGX 3,000,000</span>
              <span className="tourney-hero-stat-label">Prize Pool</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">890</span>
              <span className="tourney-hero-stat-label">Players Joined</span>
            </div>
            <div className="tourney-hero-stat">
              <span className="tourney-hero-stat-num">6h 30m</span>
              <span className="tourney-hero-stat-label">Time Left</span>
            </div>
          </div>
        </div>

        <div className="tourney-body">

          {/* About */}
          <h2 className="tourney-section-title">About This Tournament</h2>
          <div className="tourney-about">
            <p>
              Coca-Cola believes in refreshing moments of joy. The Chess Masters tournament brings
              strategic minds together to compete for refreshing prizes. Whether you're a grandmaster
              or a casual player, this is your chance to outthink your opponents and claim one of the
              most iconic sponsor prizes in Ugandan gaming.
            </p>
          </div>

          {/* Prizes */}
          <h2 className="tourney-section-title">Prizes</h2>
          <div className="tourney-prizes">
            <div className="tourney-prize-card gold">
              <span className="tourney-prize-medal">🥇</span>
              <span className="tourney-prize-place">1st Place</span>
              <span className="tourney-prize-amount">UGX 1,500,000</span>
              <span className="tourney-prize-extra">+ 1-Year Coca-Cola Supply</span>
            </div>
            <div className="tourney-prize-card silver">
              <span className="tourney-prize-medal">🥈</span>
              <span className="tourney-prize-place">2nd Place</span>
              <span className="tourney-prize-amount">UGX 900,000</span>
              <span className="tourney-prize-extra">+ 6-Month Supply</span>
            </div>
            <div className="tourney-prize-card bronze">
              <span className="tourney-prize-medal">🥉</span>
              <span className="tourney-prize-place">3rd Place</span>
              <span className="tourney-prize-amount">UGX 300,000</span>
              <span className="tourney-prize-extra">+ 3-Month Supply</span>
            </div>
          </div>

          {/* Games */}
          <h2 className="tourney-section-title">Featured Games</h2>
          <div className="tourney-games">
            <div className="tourney-game-row">
              <span className="tourney-game-icon">♟️</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Chess Master Pro</p>
                <p className="tourney-game-desc">Full-featured chess with ELO ranking — prove you're the sharpest mind on the board.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🔴</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Draughts Champion</p>
                <p className="tourney-game-desc">Classic draughts reimagined for fast-paced competitive play.</p>
              </div>
            </div>
            <div className="tourney-game-row">
              <span className="tourney-game-icon">🃏</span>
              <div className="tourney-game-info">
                <p className="tourney-game-name">Card Games</p>
                <p className="tourney-game-desc">Multiple card game variants — from Snap to strategic trick-taking games.</p>
              </div>
            </div>
          </div>

          {/* How to Join */}
          <h2 className="tourney-section-title">How to Join</h2>
          <div className="tourney-steps">
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#F40009' }}>1</div>
              <p className="tourney-step-text">Log in to your LudoChampion account or sign up for free.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#F40009' }}>2</div>
              <p className="tourney-step-text">Tap "Join Tournament" and select your preferred game mode.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#F40009' }}>3</div>
              <p className="tourney-step-text">Complete your qualifying round before the 6h 30m countdown expires.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#F40009' }}>4</div>
              <p className="tourney-step-text">Top performers advance to the knockout bracket stage.</p>
            </div>
            <div className="tourney-step">
              <div className="tourney-step-num" style={{ background: '#F40009' }}>5</div>
              <p className="tourney-step-text">Cash prizes are sent via mobile money; Coca-Cola supply delivered to your address.</p>
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
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #F40009, #FF4444)' }}
              />
            </div>
            <p className="tourney-part-label">{pct}% full — {(maxPlayers - players).toLocaleString()} spots remaining</p>
          </div>

          {/* CTA */}
          <button
            className="tourney-cta"
            style={{ background: 'linear-gradient(135deg, #F40009, #8B0000)', color: '#FFFFFF' }}
            onClick={() => alert('Tournament registration coming soon!')}
          >
            Join Tournament — Chess Masters
          </button>

        </div>
      </div>
    </main>
  )
}
