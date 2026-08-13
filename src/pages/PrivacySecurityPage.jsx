import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 13,
      background: on ? '#0a84ff' : '#3a3a3c',
      border: 'none', cursor: 'pointer', position: 'relative',
      transition: 'background 0.2s', flexShrink: 0,
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 22, height: 22, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', display: 'block',
      }} />
    </button>
  )
}

const PRIVACY_OPTIONS = ['Everybody', 'My Contacts', 'Nobody']

function PrivacySelect({ value, onChange }) {
  return (
    <button className="ps-select-btn" onClick={() => {
      const idx = PRIVACY_OPTIONS.indexOf(value)
      onChange(PRIVACY_OPTIONS[(idx + 1) % PRIVACY_OPTIONS.length])
    }}>
      {value}
    </button>
  )
}

export default function PrivacySecurityPage() {
  const navigate = useNavigate()

  const [twoStep, setTwoStep]         = useState(true)
  const [autoDelete, setAutoDelete]   = useState(false)
  const [passcode, setPasscode]       = useState(false)
  const [passkeys, setPasskeys]       = useState(false)

  const [phoneNumber, setPhoneNumber]       = useState('Nobody')
  const [lastSeen, setLastSeen]             = useState('Everybody')
  const [profilePhotos, setProfilePhotos]   = useState('Everybody')
  const [forwarded, setForwarded]           = useState('Nobody')
  const [calls, setCalls]                   = useState('Everybody')
  const [voiceMessages, setVoiceMessages]   = useState('Everybody')
  const [messages, setMessages]             = useState('Everybody')
  const [birthday, setBirthday]             = useState('Nobody')
  const [bio, setBio]                       = useState('Nobody')
  const [invites, setInvites]               = useState('Everybody')

  const SECURITY = [
    {
      color: '#5856D6',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
      label: 'Two-Step Verification',
      right: <span className="ps-value-blue">{twoStep ? 'On' : 'Off'}</span>,
      onTap: () => setTwoStep(v => !v),
    },
    {
      color: '#FF9500',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6l2 2-2 2v6h12v-6l-2-2 2-2V2H6zm10 9.5l2 2V18H6v-4.5l2-2L6 9.5V4h10v5.5l-2 2zM9 12l3 3 3-3"/></svg>,
      label: 'Auto-Delete Messages',
      right: <span className="ps-value-blue">{autoDelete ? 'On' : 'Off'}</span>,
      onTap: () => navigate('/auto-delete'),
    },
    {
      color: '#34AADC',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>,
      label: 'Local Passcode',
      right: <span className="ps-value-blue">{passcode ? 'On' : 'Off'}</span>,
      onTap: () => setPasscode(v => !v),
    },
    {
      color: '#4CAF50',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>,
      label: 'Passkeys',
      right: <span className="ps-value-blue">{passkeys ? 'On' : 'Off'}</span>,
      onTap: () => setPasskeys(v => !v),
    },
    {
      color: '#2196F3',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
      label: 'Login Email',
      right: <span className="ps-value-blue">j****@gmail.com</span>,
      onTap: () => {},
    },
    {
      color: '#FF3B30',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
      label: 'Blocked Users',
      right: <span className="ps-value-blue">0</span>,
      onTap: () => {},
    },
    {
      color: '#30B0C7',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,
      label: 'Active Sessions',
      right: <span className="ps-value-blue">1</span>,
      onTap: () => {},
    },
  ]

  const PRIVACY = [
    { label: 'Phone Number',       value: phoneNumber,     set: setPhoneNumber },
    { label: 'Last Seen & Online', value: lastSeen,        set: setLastSeen },
    { label: 'Profile Photos',     value: profilePhotos,   set: setProfilePhotos },
    { label: 'Forwarded Messages', value: forwarded,       set: setForwarded },
    { label: 'Calls',              value: calls,           set: setCalls },
    { label: 'Voice Messages',     value: voiceMessages,   set: setVoiceMessages },
    { label: 'Messages',           value: messages,        set: setMessages },
    { label: 'Birthday',           value: birthday,        set: setBirthday },
    { label: 'Bio',                value: bio,             set: setBio },
    { label: 'Invites',            value: invites,         set: setInvites },
  ]

  return (
    <main className="main-content">
      <div className="account-page">

        <button className="account-back-btn" onClick={() => navigate('/settings')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Settings
        </button>

        <h1 className="settings-title">Privacy & Security</h1>

        {/* Security section */}
        <p className="ps-section-heading">Security</p>
        <div className="settings-group">
          {SECURITY.map(({ color, icon, label, right, onTap }) => (
            <button key={label} className="settings-row" onClick={onTap}>
              <span className="settings-row-icon" style={{ background: color }}>{icon}</span>
              <span className="settings-row-text">
                <span className="settings-row-label">{label}</span>
              </span>
              {right}
              <svg className="settings-row-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>

        <p className="ps-hint">Manage your sessions on all your devices.</p>

        {/* Privacy section */}
        <p className="ps-section-heading" style={{ marginTop: 28 }}>Privacy</p>
        <div className="settings-group">
          {PRIVACY.map(({ label, value, set }) => (
            <button key={label} className="settings-row" onClick={() => {
              const idx = PRIVACY_OPTIONS.indexOf(value)
              set(PRIVACY_OPTIONS[(idx + 1) % PRIVACY_OPTIONS.length])
            }}>
              <span className="settings-row-text">
                <span className="settings-row-label">{label}</span>
              </span>
              <span className="ps-value-blue">{value}</span>
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
