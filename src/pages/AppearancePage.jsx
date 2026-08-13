import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const THEMES = [
  {
    id: 'dark',
    label: 'Dark',
    desc: 'Easy on the eyes at night',
    preview: {
      bg: '#1a1a1a',
      sidebar: '#1e1e1e',
      card: '#2a2a2a',
      accent: '#0a84ff',
      text: '#ffffff',
      sub: '#6a6a6a',
    },
  },
  {
    id: 'light',
    label: 'Light',
    desc: 'Clean and bright for daytime',
    preview: {
      bg: '#f0f2f5',
      sidebar: '#ffffff',
      card: '#ffffff',
      accent: '#0060df',
      text: '#0d0d0d',
      sub: '#8a93a2',
    },
  },
]

function ThemePreview({ p, active }) {
  return (
    <div className={`appear-preview${active ? ' selected' : ''}`} style={{ background: p.bg }}>
      {/* Mini sidebar */}
      <div className="appear-preview-sidebar" style={{ background: p.sidebar, borderColor: active ? p.accent : 'transparent' }}>
        {[40, 32, 32, 28].map((w, i) => (
          <div key={i} className="appear-preview-line" style={{ width: w, background: i === 0 ? p.accent : p.sub + '88' }} />
        ))}
      </div>
      {/* Mini content */}
      <div className="appear-preview-content">
        <div className="appear-preview-card" style={{ background: p.card }}>
          <div className="appear-preview-line" style={{ width: 60, background: p.text + 'cc' }} />
          <div className="appear-preview-line" style={{ width: 44, background: p.sub + '88' }} />
        </div>
        <div className="appear-preview-card" style={{ background: p.card }}>
          <div className="appear-preview-line" style={{ width: 52, background: p.text + 'cc' }} />
          <div className="appear-preview-line" style={{ width: 36, background: p.sub + '88' }} />
        </div>
      </div>
      {active && (
        <div className="appear-preview-check" style={{ background: p.accent }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
      )}
    </div>
  )
}

export default function AppearancePage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <main className="main-content">
      <div className="account-page">

        <button className="account-back-btn" onClick={() => navigate('/settings')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Settings
        </button>

        <h1 className="settings-title">Appearance</h1>

        <p className="appear-hint">Choose how wePlay-UG looks to you. The theme applies instantly across the entire app.</p>

        {/* Theme selector */}
        <div className="appear-themes">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`appear-theme-btn${theme === t.id ? ' active' : ''}`}
              onClick={() => setTheme(t.id)}
            >
              <ThemePreview p={t.preview} active={theme === t.id} />
              <div className="appear-theme-info">
                <span className="appear-theme-label">{t.label}</span>
                <span className="appear-theme-desc">{t.desc}</span>
              </div>
              <div className={`appear-radio${theme === t.id ? ' checked' : ''}`}>
                {theme === t.id && <span className="appear-radio-dot" />}
              </div>
            </button>
          ))}
        </div>

        {/* Current theme indicator */}
        <div className="appear-current">
          <span className="appear-current-label">Current theme:</span>
          <span className="appear-current-value">
            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </span>
        </div>

      </div>
    </main>
  )
}
