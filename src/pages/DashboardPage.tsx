import { useState } from 'react'
import { GameAccount, MatchRequest, DashAchievement } from '../types/index'

const MATCH_REQUESTS: MatchRequest[] = [
  { id: 1, from: 'BrianK256',    game: 'Ludo',     stake: 'UGX 5,000',  avatar: 'B', online: true  },
  { id: 2, from: 'QueenAisha',   game: 'Chess',    stake: 'UGX 10,000', avatar: 'Q', online: true  },
  { id: 3, from: 'RollMaster_X', game: 'Draughts', stake: 'UGX 3,000',  avatar: 'R', online: false },
  { id: 4, from: 'JoelXGamer',   game: 'Pool',     stake: 'UGX 8,000',  avatar: 'J', online: true  },
]

const ACHIEVEMENTS: DashAchievement[] = [
  { icon: '🏆', title: 'Tournament Champion',  desc: 'Won MTN Pulse Cup 2026',       unlocked: true  },
  { icon: '👑', title: 'Board Master',         desc: '100+ games won',               unlocked: true  },
  { icon: '🎩', title: 'Hat Trick',            desc: '3 wins in a row',              unlocked: true  },
  { icon: '⚡', title: 'Speed Demon',          desc: 'Win in under 3 minutes',       unlocked: false },
  { icon: '🌍', title: 'Pan-African Player',   desc: 'Beat players from 5 countries', unlocked: true  },
  { icon: '💎', title: 'Diamond Rank',         desc: 'Reach Diamond division',       unlocked: false },
]

const GAME_ACCOUNTS: GameAccount[] = [
  { id: 'ludo',     name: 'Ludo Champion',  balance: 'UGX 12,000', raw: 12000, color: '#5856D6', icon: '🎲' },
  { id: 'chess',    name: 'Chess Pro',      balance: 'UGX 8,500',  raw: 8500,  color: '#34AADC', icon: '♟️' },
  { id: 'draughts', name: 'Draughts',       balance: 'UGX 5,000',  raw: 5000,  color: '#4CAF50', icon: '⬤'  },
  { id: 'pool',     name: 'Pool Master',    balance: 'UGX 0',      raw: 0,     color: '#FF9500', icon: '🎱' },
]

export default function DashboardPage() {
  const [transferFrom, setTransferFrom] = useState<string>('Ludo Champion')
  const [transferTo, setTransferTo]     = useState<string>('Chess Pro')
  const [transferAmt, setTransferAmt]   = useState<string>('')
  const [showTransfer, setShowTransfer] = useState<boolean>(false)

  return (
    <main className="main-content">
      <div className="dash-page">

        {/* ── HEADER ── */}
        <div className="dash-header">
          <div className="dash-greeting">
            <div className="dash-avatar">LC</div>
            <div>
              <p className="dash-welcome">Welcome back,</p>
              <h1 className="dash-username">LudoChampion 👑</h1>
            </div>
          </div>
          <div className="dash-rank-badge">
            <span className="dash-rank-label">Rank</span>
            <span className="dash-rank-num">#5</span>
            <span className="dash-rank-div">Uganda</span>
          </div>
        </div>

        {/* ── WALLET CARD ── */}
        <div className="dash-wallet-card">
          <div className="dash-wallet-top">
            <div>
              <p className="dash-wallet-label">Total Balance</p>
              <h2 className="dash-wallet-amount">UGX 243,500</h2>
              <p className="dash-wallet-sub">Available to stake or withdraw</p>
            </div>
            <div className="dash-wallet-icon">💰</div>
          </div>
          <div className="dash-wallet-actions">
            <button className="dash-wallet-btn deposit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 8 7-8zm-14 9v2h14v-2H5z"/></svg>
              Deposit
            </button>
            <button className="dash-wallet-btn withdraw">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 15h4v6h6v-6h4l-7-8-7 8zm14-9V4H5v2h14z"/></svg>
              Withdraw
            </button>
            <button className="dash-wallet-btn transfer" onClick={() => setShowTransfer(v => !v)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>
              Transfer
            </button>
          </div>

          {/* Transfer panel */}
          {showTransfer && (
            <div className="dash-transfer-panel">
              <p className="dash-transfer-title">Transfer Between Game Accounts</p>
              <div className="dash-transfer-row">
                <div className="dash-transfer-field">
                  <label>From</label>
                  <select value={transferFrom} onChange={e => setTransferFrom(e.target.value)}>
                    {GAME_ACCOUNTS.map(g => <option key={g.name}>{g.name}</option>)}
                  </select>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{color:'var(--text-muted)',flexShrink:0}}><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>
                <div className="dash-transfer-field">
                  <label>To</label>
                  <select value={transferTo} onChange={e => setTransferTo(e.target.value)}>
                    {GAME_ACCOUNTS.map(g => <option key={g.name}>{g.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="dash-transfer-amt-row">
                <input
                  type="number"
                  placeholder="Amount (UGX)"
                  value={transferAmt}
                  onChange={e => setTransferAmt(e.target.value)}
                  className="dash-transfer-input"
                />
                <button className="dash-transfer-confirm" onClick={() => { setTransferAmt(''); setShowTransfer(false) }}>
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── GAME ACCOUNTS ── */}
        <h2 className="dash-section-title">Game Accounts</h2>
        <div className="dash-game-accounts">
          {GAME_ACCOUNTS.map(g => (
            <div key={g.name} className="dash-game-acc" style={{ borderColor: g.color }}>
              <span className="dash-game-acc-icon" style={{ background: g.color + '22' }}>{g.icon}</span>
              <div className="dash-game-acc-info">
                <p className="dash-game-acc-name">{g.name}</p>
                <p className="dash-game-acc-bal">{g.balance}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── STATS ROW ── */}
        <div className="dash-stats-row">
          <div className="dash-stat-card">
            <span className="dash-stat-num">142</span>
            <span className="dash-stat-lbl">Matches Played</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">89</span>
            <span className="dash-stat-lbl">Wins</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">63%</span>
            <span className="dash-stat-lbl">Win Rate</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">12</span>
            <span className="dash-stat-lbl">Win Streak</span>
          </div>
        </div>

        {/* ── MATCH REQUESTS ── */}
        <h2 className="dash-section-title">
          Match Requests
          <span className="dash-badge">{MATCH_REQUESTS.length}</span>
        </h2>
        <div className="dash-requests">
          {MATCH_REQUESTS.map(r => (
            <div key={r.id} className="dash-request-card">
              <div className="dash-req-avatar">
                {r.avatar}
                {r.online && <span className="dash-req-online" />}
              </div>
              <div className="dash-req-info">
                <p className="dash-req-name">{r.from}</p>
                <p className="dash-req-detail">{r.game} · Stake: <strong>{r.stake}</strong></p>
              </div>
              <div className="dash-req-actions">
                <button className="dash-req-btn accept">Accept</button>
                <button className="dash-req-btn decline">Decline</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── ACHIEVEMENTS ── */}
        <h2 className="dash-section-title">Achievements & Belts</h2>
        <div className="dash-achievements">
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} className={`dash-achieve${a.unlocked ? ' unlocked' : ' locked'}`}>
              <span className="dash-achieve-icon">{a.icon}</span>
              <p className="dash-achieve-title">{a.title}</p>
              <p className="dash-achieve-desc">{a.desc}</p>
              {!a.unlocked && <div className="dash-achieve-lock">🔒</div>}
            </div>
          ))}
        </div>

        {/* ── TOURNAMENT BELTS ── */}
        <h2 className="dash-section-title">Tournament Belts Won</h2>
        <div className="dash-belts">
          <div className="dash-belt gold">
            <span className="dash-belt-icon">🏆</span>
            <div>
              <p className="dash-belt-name">MTN Pulse Cup 2026</p>
              <p className="dash-belt-sub">1st Place · Ludo Champion</p>
            </div>
            <span className="dash-belt-tag">GOLD</span>
          </div>
          <div className="dash-belt silver">
            <span className="dash-belt-icon">🥈</span>
            <div>
              <p className="dash-belt-name">WePlay Weekly Cup #12</p>
              <p className="dash-belt-sub">2nd Place · Chess</p>
            </div>
            <span className="dash-belt-tag">SILVER</span>
          </div>
          <div className="dash-belt bronze">
            <span className="dash-belt-icon">🥉</span>
            <div>
              <p className="dash-belt-name">Community Draughts League</p>
              <p className="dash-belt-sub">3rd Place · Draughts</p>
            </div>
            <span className="dash-belt-tag">BRONZE</span>
          </div>
        </div>


      </div>
    </main>
  )
}
