import { useState } from 'react'
import { GameAccount, Transaction } from '../types/index'

const GAME_ACCOUNTS: GameAccount[] = [
  { id: 'ludo',     name: 'Ludo Champion',  balance: 'UGX 12,000', raw: 12000, color: '#5856D6', icon: '🎲' },
  { id: 'chess',    name: 'Chess Pro',      balance: 'UGX 8,500',  raw: 8500,  color: '#34AADC', icon: '♟️' },
  { id: 'draughts', name: 'Draughts',       balance: 'UGX 5,000',  raw: 5000,  color: '#4CAF50', icon: '⬤'  },
  { id: 'pool',     name: 'Pool Master',    balance: 'UGX 0',      raw: 0,     color: '#FF9500', icon: '🎱' },
]

const ALL_TRANSACTIONS: Transaction[] = [
  { id: 1,  type: 'deposit',    label: 'MTN MoMo Deposit',           amount: '+UGX 50,000',  date: 'Today, 09:14',   color: '#4CAF50', account: 'Main Wallet' },
  { id: 2,  type: 'stake',      label: 'Stake — Ludo vs BrianK',     amount: '-UGX 10,000',  date: 'Today, 08:45',   color: '#FF9500', account: 'Ludo Champion' },
  { id: 3,  type: 'win',        label: 'Win — Chess vs AishaQ',      amount: '+UGX 18,000',  date: 'Yesterday',      color: '#4CAF50', account: 'Chess Pro' },
  { id: 4,  type: 'transfer',   label: 'Transfer → Draughts Acc',    amount: '-UGX 5,000',   date: 'Yesterday',      color: '#0a84ff', account: 'Main Wallet' },
  { id: 5,  type: 'withdrawal', label: 'Withdraw to Airtel Money',   amount: '-UGX 30,000',  date: 'Jun 7, 14:22',   color: '#FF3B30', account: 'Main Wallet' },
  { id: 6,  type: 'deposit',    label: 'Airtel Money Deposit',       amount: '+UGX 20,000',  date: 'Jun 6, 11:05',   color: '#4CAF50', account: 'Main Wallet' },
  { id: 7,  type: 'stake',      label: 'Stake — Pool vs JoelX',      amount: '-UGX 8,000',   date: 'Jun 5, 19:30',   color: '#FF9500', account: 'Pool Master' },
  { id: 8,  type: 'win',        label: 'Tournament Prize — MTN Cup', amount: '+UGX 150,000', date: 'Jun 4, 17:00',   color: '#FFD700', account: 'Main Wallet' },
  { id: 9,  type: 'withdrawal', label: 'Withdraw to MTN MoMo',       amount: '-UGX 50,000',  date: 'Jun 3, 10:00',   color: '#FF3B30', account: 'Main Wallet' },
  { id: 10, type: 'deposit',    label: 'MTN MoMo Deposit',           amount: '+UGX 100,000', date: 'Jun 2, 08:30',   color: '#4CAF50', account: 'Main Wallet' },
]

const TIME_FILTERS = ['All time', 'Today', 'This week', 'This month']

const TX_META: Record<Transaction['type'], { icon: string; bg: string; color: string; label: string }> = {
  deposit:    { icon: '↓', bg: '#0d2e0d', color: '#4CAF50', label: 'Deposit'    },
  win:        { icon: '★', bg: '#2a2a00', color: '#FFD700', label: 'Win'        },
  stake:      { icon: '⚔', bg: '#2a1400', color: '#FF9500', label: 'Stake'      },
  transfer:   { icon: '⇄', bg: '#001430', color: '#0a84ff', label: 'Transfer'   },
  withdrawal: { icon: '↑', bg: '#2e0d0d', color: '#FF3B30', label: 'Withdrawal' },
}

type ModalProps = { onClose: () => void }

function DepositModal({ onClose }: ModalProps) {
  const [method, setMethod] = useState('mtn')
  const [amount, setAmount] = useState('')
  return (
    <div className="fin-modal-backdrop" onClick={onClose}>
      <div className="fin-modal" onClick={e => e.stopPropagation()}>
        <div className="fin-modal-header">
          <h3>Deposit Funds</h3>
          <button className="fin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="fin-modal-body">
          <p className="fin-modal-label">Payment Method</p>
          <div className="fin-method-grid">
            {[
              { id: 'mtn',    label: 'MTN MoMo',    color: '#FFCC00', bg: '#2a2000' },
              { id: 'airtel', label: 'Airtel Money', color: '#FF4444', bg: '#2a0000' },
              { id: 'card',   label: 'Visa / MC',    color: '#0a84ff', bg: '#001430' },
              { id: 'bank',   label: 'Bank Transfer',color: '#4CAF50', bg: '#0d2000' },
            ].map(m => (
              <button key={m.id} className={`fin-method-btn${method === m.id ? ' active' : ''}`}
                style={{ borderColor: method === m.id ? m.color : 'var(--border-color)', background: method === m.id ? m.bg : 'var(--bg-secondary)' }}
                onClick={() => setMethod(m.id)}>
                <span style={{ color: m.color, fontWeight: 700 }}>{m.label}</span>
              </button>
            ))}
          </div>
          <p className="fin-modal-label" style={{ marginTop: 16 }}>Amount (UGX)</p>
          <input className="fin-modal-input" type="number" placeholder="e.g. 10,000" value={amount} onChange={e => setAmount(e.target.value)} />
          <div className="fin-quick-amounts">
            {['5,000','10,000','20,000','50,000','100,000'].map(a => (
              <button key={a} className="fin-quick-btn" onClick={() => setAmount(a.replace(',',''))}>{a}</button>
            ))}
          </div>
        </div>
        <div className="fin-modal-footer">
          <button className="fin-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="fin-modal-confirm" style={{ background: '#4CAF50' }} onClick={onClose}>Deposit</button>
        </div>
      </div>
    </div>
  )
}

function WithdrawModal({ onClose }: ModalProps) {
  const [method, setMethod] = useState('mtn')
  const [amount, setAmount] = useState('')
  return (
    <div className="fin-modal-backdrop" onClick={onClose}>
      <div className="fin-modal" onClick={e => e.stopPropagation()}>
        <div className="fin-modal-header">
          <h3>Withdraw Funds</h3>
          <button className="fin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="fin-modal-body">
          <p className="fin-modal-label">Withdraw To</p>
          <div className="fin-method-grid">
            {[
              { id: 'mtn',    label: 'MTN MoMo',    color: '#FFCC00', bg: '#2a2000' },
              { id: 'airtel', label: 'Airtel Money', color: '#FF4444', bg: '#2a0000' },
              { id: 'bank',   label: 'Bank Account', color: '#4CAF50', bg: '#0d2000' },
            ].map(m => (
              <button key={m.id} className={`fin-method-btn${method === m.id ? ' active' : ''}`}
                style={{ borderColor: method === m.id ? m.color : 'var(--border-color)', background: method === m.id ? m.bg : 'var(--bg-secondary)' }}
                onClick={() => setMethod(m.id)}>
                <span style={{ color: m.color, fontWeight: 700 }}>{m.label}</span>
              </button>
            ))}
          </div>
          <p className="fin-modal-label" style={{ marginTop: 16 }}>Amount (UGX)</p>
          <input className="fin-modal-input" type="number" placeholder="Min UGX 5,000" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="fin-modal-footer">
          <button className="fin-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="fin-modal-confirm" style={{ background: '#FF3B30' }} onClick={onClose}>Withdraw</button>
        </div>
      </div>
    </div>
  )
}

function TransferModal({ onClose }: ModalProps) {
  const [from, setFrom] = useState('Main Wallet')
  const [to, setTo]     = useState('Ludo Champion')
  const [amount, setAmount] = useState('')
  const accounts = ['Main Wallet', ...GAME_ACCOUNTS.map(g => g.name)]
  return (
    <div className="fin-modal-backdrop" onClick={onClose}>
      <div className="fin-modal" onClick={e => e.stopPropagation()}>
        <div className="fin-modal-header">
          <h3>Transfer Funds</h3>
          <button className="fin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="fin-modal-body">
          <div className="fin-transfer-row">
            <div className="fin-transfer-field">
              <p className="fin-modal-label">From</p>
              <select className="fin-modal-select" value={from} onChange={e => setFrom(e.target.value)}>
                {accounts.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 20 }}>
              <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
            </svg>
            <div className="fin-transfer-field">
              <p className="fin-modal-label">To</p>
              <select className="fin-modal-select" value={to} onChange={e => setTo(e.target.value)}>
                {accounts.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <p className="fin-modal-label" style={{ marginTop: 16 }}>Amount (UGX)</p>
          <input className="fin-modal-input" type="number" placeholder="e.g. 5,000" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="fin-modal-footer">
          <button className="fin-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="fin-modal-confirm" style={{ background: '#0a84ff' }} onClick={onClose}>Transfer</button>
        </div>
      </div>
    </div>
  )
}

export default function FinancesPage() {
  const [modal, setModal]         = useState<'deposit' | 'withdraw' | 'transfer' | null>(null)
  const [txType, setTxType]       = useState<string>('All')
  const [timeFilter, setTimeFilter] = useState('All time')
  const [selectedAcc, setSelectedAcc] = useState('all')

  const filtered = ALL_TRANSACTIONS.filter(tx => {
    const typeMatch = txType === 'All' || tx.type === txType.toLowerCase()
    return typeMatch
  })

  return (
    <main className="main-content">
      <div className="fin-page">

        <h1 className="fin-title">Finances</h1>

        {/* ── Action Cards ── */}
        <div className="fin-actions-grid">
          <button className="fin-action-card" onClick={() => setModal('deposit')}>
            <span className="fin-action-icon" style={{ background: '#0d2e0d' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#4CAF50"><path d="M19 9h-4V3H9v6H5l7 8 7-8zm-14 9v2h14v-2H5z"/></svg>
            </span>
            <span className="fin-action-label">Deposit</span>
          </button>
          <button className="fin-action-card" onClick={() => setModal('withdraw')}>
            <span className="fin-action-icon" style={{ background: '#2e0d0d' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF3B30"><path d="M5 15h4v6h6v-6h4l-7-8-7 8zm14-9V4H5v2h14z"/></svg>
            </span>
            <span className="fin-action-label">Withdrawal</span>
          </button>
          <button className="fin-action-card" onClick={() => setModal('transfer')}>
            <span className="fin-action-icon" style={{ background: '#001430' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a84ff"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>
            </span>
            <span className="fin-action-label">Transfer</span>
          </button>
        </div>

        {/* ── Transaction History ── */}
        <h2 className="fin-section-title">Transaction history</h2>

        <div className="fin-history-card">
          {/* Account selector */}
          <div className="fin-acc-selector">
            <button className={`fin-acc-btn${selectedAcc === 'all' ? ' active' : ''}`} onClick={() => setSelectedAcc('all')}>
              <span className="fin-acc-icon" style={{ background: '#1a1a3a' }}>💼</span>
              <div>
                <p className="fin-acc-name">All Accounts</p>
                <p className="fin-acc-balance">UGX 243,500</p>
              </div>
              <svg className="fin-acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 10l-4 4-4-4"/></svg>
            </button>
            {GAME_ACCOUNTS.map(acc => (
              <button key={acc.id} className={`fin-acc-btn${selectedAcc === acc.id ? ' active' : ''}`} onClick={() => setSelectedAcc(acc.id)}>
                <span className="fin-acc-icon" style={{ background: acc.color + '22', color: acc.color, fontSize: 18 }}>{acc.icon}</span>
                <div>
                  <p className="fin-acc-name">{acc.name}</p>
                  <p className="fin-acc-balance">{acc.balance}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Time filter */}
          <div className="fin-time-row">
            <select className="fin-time-select" value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
              {TIME_FILTERS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Type filter pills */}
          <div className="fin-type-filters">
            {['All', 'Deposit', 'Withdrawal', 'Transfer', 'Stake', 'Win'].map(f => (
              <button key={f} className={`fin-type-btn${txType === f ? ' active' : ''}`} onClick={() => setTxType(f)}>
                {f}
              </button>
            ))}
          </div>

          {/* Transaction rows */}
          {filtered.length === 0 ? (
            <div className="fin-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>No transactions here just yet.</p>
            </div>
          ) : (
            <div className="fin-tx-list">
              {filtered.map(tx => {
                const meta = TX_META[tx.type]
                return (
                  <div key={tx.id} className="fin-tx-row">
                    <div className="fin-tx-icon" style={{ background: meta.bg }}>
                      <span style={{ color: meta.color, fontSize: 16 }}>{meta.icon}</span>
                    </div>
                    <div className="fin-tx-info">
                      <p className="fin-tx-label">{tx.label}</p>
                      <p className="fin-tx-meta">{tx.account} · {tx.date}</p>
                    </div>
                    <span className="fin-tx-amount" style={{ color: tx.color }}>{tx.amount}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* Modals */}
      {modal === 'deposit'  && <DepositModal  onClose={() => setModal(null)} />}
      {modal === 'withdraw' && <WithdrawModal onClose={() => setModal(null)} />}
      {modal === 'transfer' && <TransferModal onClose={() => setModal(null)} />}
    </main>
  )
}
