import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LIVE_TOURNAMENTS, LEADERBOARD, WEEKLY_CHALLENGES, ACHIEVEMENTS } from '../data/arcadeData'

export default function ArcadePage() {
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState(WEEKLY_CHALLENGES)
  const [achievements] = useState(ACHIEVEMENTS)
  const [lbTab, setLbTab] = useState('global')

  const claimChallenge = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, claimed: true } : c))
  }

  return (
    <main className="main-content">
      {/* Arcade hero */}
      <section className="arcade-hero">
        <div className="arcade-bg-slider">
          <div className="arcade-bg arcade-bg-1" />
          <div className="arcade-bg arcade-bg-2" />
          <div className="arcade-bg arcade-bg-1" />
        </div>
        <div className="arcade-hero-glow" />
        <div className="arcade-hero-content">
          <div className="arcade-hero-icon">🕹️</div>
          <h1 className="arcade-hero-title">Arcade</h1>
          <p className="arcade-hero-sub">Compete. Win. Dominate.</p>
          <div className="arcade-hero-stats">
            <div className="arcade-hero-stat"><span className="arcade-stat-num">24</span><span className="arcade-stat-label">Live Tournaments</span></div>
            <div className="arcade-hero-stat"><span className="arcade-stat-num">180K</span><span className="arcade-stat-label">Active Players</span></div>
            <div className="arcade-hero-stat"><span className="arcade-stat-num">$50K</span><span className="arcade-stat-label">Total Prize Pool</span></div>
          </div>
        </div>
      </section>

      {/* Live Tournaments */}
      <section className="apps-section">
        <h2 className="apps-section-title">
          <span className="arcade-live-dot" /> Live Tournaments
        </h2>
        <div className="arcade-tournaments-grid">
          {LIVE_TOURNAMENTS.map((t) => {
            const pct = Math.round((t.players / t.maxPlayers) * 100)
            return (
              <div key={t.id} className="arcade-tourney-card" style={{ background: `linear-gradient(135deg, ${t.grad[0]}, ${t.grad[1]})` }}>
                <div className="arcade-tourney-header">
                  {t.sponsorLogo
                    ? <span className="arcade-sponsor-badge arcade-sponsor-badge--logo" style={{ background: t.sponsorColor }}><img src={t.sponsorLogo} alt={t.sponsor} className="arcade-sponsor-logo-img" /></span>
                    : <span className="arcade-sponsor-badge" style={{ background: t.sponsorColor, color: t.sponsorTextColor }}>{t.sponsor}</span>
                  }
                  <span className={`arcade-tourney-status ${t.status === 'LIVE' ? 'live' : 'soon'}`}>{t.status}</span>
                </div>
                <span className="arcade-tourney-prize">{t.prize}</span>
                <h3 className="arcade-tourney-title">{t.title}</h3>
                <p className="arcade-tourney-game">{t.game}</p>
                <div className="arcade-tourney-fill-bar">
                  <div className="arcade-tourney-fill-track">
                    <div className="arcade-tourney-fill-inner" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="arcade-tourney-players">{t.players.toLocaleString()} / {t.maxPlayers.toLocaleString()} players</span>
                </div>
                <div className="arcade-tourney-footer">
                  <span className="arcade-tourney-time">⏱ {t.endsIn} left</span>
                  <button className="arcade-join-btn" onClick={() => navigate(t.route)}>{t.status === 'LIVE' ? 'Join Now' : 'Register'}</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="apps-section">
        <div className="apps-section-header">
          <h2 className="apps-section-title">Leaderboard</h2>
          <div className="apps-tabs">
            <button className={`apps-tab${lbTab === 'global' ? ' active' : ''}`} onClick={() => setLbTab('global')}>Global</button>
            <button className={`apps-tab${lbTab === 'friends' ? ' active' : ''}`} onClick={() => setLbTab('friends')}>Friends</button>
          </div>
        </div>
        <div className="arcade-leaderboard">
          {LEADERBOARD.map((p) => (
            <div key={p.rank} className={`arcade-lb-row${p.rank <= 3 ? ' top3' : ''}`}>
              <span className={`arcade-lb-rank rank-${p.rank}`}>
                {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
              </span>
              <div className="arcade-lb-avatar">{p.name[0]}</div>
              <div className="arcade-lb-info">
                <span className="arcade-lb-name">{p.name} {p.crown && '👑'}</span>
                <span className="arcade-lb-country">{p.country}</span>
              </div>
              <span className="arcade-lb-score">{p.score.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Challenges */}
      <section className="apps-section">
        <h2 className="apps-section-title">Weekly Challenges</h2>
        <div className="arcade-challenges">
          {challenges.map((c) => {
            const pct = Math.round((c.progress / c.total) * 100)
            const done = c.progress >= c.total
            return (
              <div key={c.id} className={`arcade-challenge-card${done ? ' done' : ''}`}>
                <span className="arcade-challenge-icon">{c.icon}</span>
                <div className="arcade-challenge-body">
                  <p className="arcade-challenge-title">{c.title}</p>
                  <div className="arcade-challenge-bar-wrap">
                    <div className="arcade-challenge-bar">
                      <div className="arcade-challenge-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="arcade-challenge-prog">{c.progress}/{c.total}</span>
                  </div>
                </div>
                <div className="arcade-challenge-right">
                  <span className="arcade-challenge-reward">{c.reward}</span>
                  {done && !c.claimed && (
                    <button className="arcade-claim-btn" onClick={() => claimChallenge(c.id)}>Claim</button>
                  )}
                  {c.claimed && <span className="arcade-claimed-badge">✓ Claimed</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="apps-section">
        <h2 className="apps-section-title">Achievements</h2>
        <div className="arcade-achievements-grid">
          {achievements.map((a) => (
            <div key={a.id} className={`arcade-achievement${a.unlocked ? ' unlocked' : ' locked'}`}>
              <span className="arcade-achievement-icon">{a.icon}</span>
              <h4 className="arcade-achievement-title">{a.title}</h4>
              <p className="arcade-achievement-desc">{a.desc}</p>
              {!a.unlocked && <div className="arcade-lock-overlay">🔒</div>}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
