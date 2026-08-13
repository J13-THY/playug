import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
  const navigate = useNavigate()

  const INFO_ROWS = [
    {
      color: '#2196F3',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>,
      label: 'Name',
      value: 'LudoChampion',
    },
    {
      color: '#4CAF50',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>,
      label: 'Phone Number',
      value: '+256 700 000 000',
    },
    {
      color: '#5856D6',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 4h-2v6h2V6zm0 8h-2v2h2v-2z"/></svg>,
      label: 'Username',
      value: '@ludochampion',
    },
  ]

  const EXTRA_ROWS = [
    {
      color: '#FF9500',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2H8C6.34 2 5 3.34 5 5v14c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zm1 16H7V6h10v12zm-5-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>,
      label: 'Personal Channel',
      value: 'Add',
      valueBlue: true,
    },
    {
      color: '#34AADC',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
      label: 'Bio',
      value: 'Edit',
      valueBlue: true,
    },
    {
      color: '#AF52DE',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>,
      label: 'Name Colour',
      value: 'Default',
    },
  ]

  return (
    <main className="main-content">
      <div className="account-page">

        {/* Back button */}
        <button className="account-back-btn" onClick={() => navigate('/settings')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Settings
        </button>

        {/* Avatar section */}
        <div className="account-hero">
          <div className="account-avatar-wrap">
            <img src="/dp.jpg" alt="Profile" className="account-avatar" />
            <button className="account-avatar-edit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Z"/>
                <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Zm3 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
              </svg>
            </button>
          </div>
          <h1 className="account-name">LudoChampion</h1>
          <span className="account-online">online</span>
        </div>

        {/* Bio box */}
        <div className="account-bio-box">
          <p className="account-bio-hint">Any details such as your game rank, region, or favourite game.</p>
          <p className="account-bio-hint">Example: Diamond-ranked Ludo player from Kampala.</p>
        </div>

        {/* Info rows */}
        <div className="settings-group">
          {INFO_ROWS.map(({ color, icon, label, value }) => (
            <button key={label} className="settings-row account-info-row">
              <span className="settings-row-icon" style={{ background: color }}>{icon}</span>
              <span className="settings-row-text">
                <span className="settings-row-label">{label}</span>
                <span className="account-info-value">{value}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="account-note">Your username lets other players find and challenge you without knowing your phone number.</p>

        {/* Extra rows */}
        <div className="settings-group">
          {EXTRA_ROWS.map(({ color, icon, label, value, valueBlue }) => (
            <button key={label} className="settings-row">
              <span className="settings-row-icon" style={{ background: color }}>{icon}</span>
              <span className="settings-row-text">
                <span className="settings-row-label">{label}</span>
              </span>
              <span className={valueBlue ? 'settings-row-value account-value-blue' : 'settings-row-value'}>{value}</span>
              <svg className="settings-row-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>

      </div>
    </main>
  )
}
