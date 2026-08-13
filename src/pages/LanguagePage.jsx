import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LANGUAGES = [
  { name: 'English',                  native: 'English' },
  { name: 'Belarusian',               native: 'Беларуская' },
  { name: 'Catalan',                  native: 'Català' },
  { name: 'Chinese (Simplified)',     native: '简体中文' },
  { name: 'Chinese (Traditional)',    native: '繁體中文' },
  { name: 'Croatian',                 native: 'Hrvatski' },
  { name: 'Dutch',                    native: 'Nederlands' },
  { name: 'Finnish',                  native: 'Suomi' },
  { name: 'French',                   native: 'Français' },
  { name: 'German',                   native: 'Deutsch' },
  { name: 'Indonesian',               native: 'Bahasa Indonesia' },
  { name: 'Italian',                  native: 'Italiano' },
  { name: 'Kazakh',                   native: 'Қазақша' },
  { name: 'Korean',                   native: '한국어' },
  { name: 'Malay',                    native: 'Bahasa Melayu' },
  { name: 'Norwegian (Bokmål)',       native: 'Norsk (Bokmål)' },
  { name: 'Polish',                   native: 'Polski' },
  { name: 'Portuguese (Brazil)',      native: 'Português (Brasil)' },
  { name: 'Romanian',                 native: 'Română' },
  { name: 'Russian',                  native: 'Русский' },
  { name: 'Serbian',                  native: 'Српски' },
  { name: 'Spanish',                  native: 'Español' },
  { name: 'Turkish',                  native: 'Türkçe' },
  { name: 'Ukrainian',                native: 'Українська' },
  { name: 'Luganda',                  native: 'Luganda' },
  { name: 'Swahili',                  native: 'Kiswahili' },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 48, height: 28, borderRadius: 14,
        background: on ? '#0a84ff' : '#3a3a3c',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s ease', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3,
        left: on ? 23 : 3,
        width: 22, height: 22, borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s ease',
        display: 'block',
      }} />
    </button>
  )
}

export default function LanguagePage() {
  const navigate = useNavigate()
  const [pending, setPending]       = useState('English')
  const [search, setSearch]         = useState('')
  const [showTranslate, setShowTranslate]   = useState(false)
  const [translateChats, setTranslateChats] = useState(false)

  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase())
  )

  const handleOK = () => {
    navigate('/settings')
  }

  return (
    <main className="main-content">
      <div className="lang-page">

        <button className="account-back-btn" onClick={() => navigate('/settings')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Settings
        </button>

        <h1 className="lang-title">Language</h1>

        {/* Translate toggles */}
        <div className="settings-group" style={{ marginBottom: 8 }}>
          <div className="settings-row notif-row">
            <span className="settings-row-text">
              <span className="settings-row-label">Show Translate Button</span>
            </span>
            <Toggle on={showTranslate} onChange={setShowTranslate} />
          </div>
          <div className="settings-row notif-row">
            <span className="settings-row-text">
              <span className="settings-row-label">Translate Entire Chats</span>
            </span>
            <Toggle on={translateChats} onChange={setTranslateChats} />
          </div>
        </div>

        <p className="lang-hint">The 'Translate' button will appear in the context menu of messages containing text.</p>

        {/* Search */}
        <div className="lang-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="lang-search-input"
          />
        </div>

        {/* Language list */}
        <div className="settings-group lang-list">
          {filtered.map(({ name, native }) => (
            <button
              key={name}
              className={`lang-row${pending === name ? ' active' : ''}`}
              onClick={() => setPending(name)}
            >
              <span className={`lang-radio${pending === name ? ' checked' : ''}`}>
                {pending === name && <span className="lang-radio-inner" />}
              </span>
              <span className="lang-row-text">
                <span className="lang-row-native">{native}</span>
                <span className="lang-row-name">{name}</span>
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="lang-empty">No languages found</p>
          )}
        </div>

        {/* OK button */}
        <div className="lang-ok-row">
          <button className="lang-ok-btn" onClick={handleOK}>OK</button>
        </div>

      </div>
    </main>
  )
}
