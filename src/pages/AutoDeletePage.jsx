import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OPTIONS = [
  { id: 'off',    label: 'Off' },
  { id: '1day',   label: 'After 1 day' },
  { id: '1week',  label: 'After 1 week' },
  { id: '1month', label: 'After 1 month' },
  { id: 'custom', label: 'Set Custom Time', custom: true },
]

const CUSTOM_OPTIONS = [
  '1 day', '2 days', '3 days', '1 week', '2 weeks',
  '1 month', '2 months', '3 months', '4 months', '5 months',
  '6 months', '1 year',
]

function CustomTimeModal({ onCancel, onSave }) {
  const [selectedIdx, setSelectedIdx] = useState(10) // default: 5 months
  const listRef = useRef(null)
  const itemHeight = 48

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = (selectedIdx - 2) * itemHeight
    }
  }, [])

  const handleScroll = () => {
    if (!listRef.current) return
    const idx = Math.round(listRef.current.scrollTop / itemHeight) + 2
    setSelectedIdx(Math.max(2, Math.min(CUSTOM_OPTIONS.length - 1, idx)))
  }

  return (
    <div className="autodel-modal-backdrop" onClick={onCancel}>
      <div className="autodel-modal" onClick={e => e.stopPropagation()}>
        <h3 className="autodel-modal-title">Auto-delete messages</h3>

        <div className="autodel-picker-wrap">
          {/* selection highlight */}
          <div className="autodel-picker-selection" />

          <div
            className="autodel-picker-list"
            ref={listRef}
            onScroll={handleScroll}
          >
            {/* padding items top & bottom so first/last can center */}
            <div style={{ height: itemHeight * 2 }} />
            {CUSTOM_OPTIONS.map((opt, i) => (
              <div
                key={opt}
                className={`autodel-picker-item${i === selectedIdx ? ' active' : i === selectedIdx - 1 || i === selectedIdx + 1 ? ' near' : ''}`}
                onClick={() => {
                  setSelectedIdx(i)
                  listRef.current.scrollTop = (i - 2) * itemHeight
                }}
              >
                {opt}
              </div>
            ))}
            <div style={{ height: itemHeight * 2 }} />
          </div>
        </div>

        <div className="autodel-modal-actions">
          <button className="autodel-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="autodel-modal-save" onClick={() => onSave(CUSTOM_OPTIONS[selectedIdx])}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default function AutoDeletePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('off')
  const [showCustom, setShowCustom] = useState(false)
  const [customValue, setCustomValue] = useState(null)

  const handleCustomSave = (val) => {
    setCustomValue(val)
    setSelected('custom_set')
    setShowCustom(false)
  }

  return (
    <main className="main-content">
      <div className="account-page">

        <button className="account-back-btn" onClick={() => navigate('/privacy-security')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Privacy & Security
        </button>

        <h1 className="settings-title">Auto-Delete Messages</h1>

        <div className="autodel-illustration">
          <div className="autodel-emoji">🕵️</div>
          <div className="autodel-sparks">
            <span>✨</span><span>💥</span><span>✨</span>
          </div>
        </div>

        <p className="ps-section-heading">Self-destruct timer</p>
        <div className="settings-group">
          {OPTIONS.map(({ id, label, custom }) => (
            <button
              key={id}
              className={`settings-row autodel-row${custom ? ' autodel-custom' : ''}`}
              onClick={() => {
                if (custom) { setShowCustom(true) }
                else setSelected(id)
              }}
            >
              <span className="settings-row-text">
                <span className="settings-row-label" style={{ color: custom ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                  {label}
                  {custom && customValue && <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>({customValue})</span>}
                </span>
              </span>
              {!custom && (
                <span className={`autodel-radio${selected === id || (id === 'custom' && selected === 'custom_set') ? ' checked' : ''}`}>
                  {(selected === id || (id === 'custom' && selected === 'custom_set')) && <span className="autodel-radio-inner" />}
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="autodel-hint">
          If enabled, all new match chats and messages you start will be automatically deleted after the selected time.{' '}
          <button className="autodel-link">Apply this setting to existing chats.</button>
        </p>

      </div>

      {showCustom && (
        <CustomTimeModal
          onCancel={() => setShowCustom(false)}
          onSave={handleCustomSave}
        />
      )}
    </main>
  )
}
