import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToggleProps, NotifToggleState } from '../types/index'

function Toggle({ on, onChange }: ToggleProps) {
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

const CORNERS = [
  { id: 'top-left',     label: 'Top Left',     style: { top: '14%', left: '10%' } },
  { id: 'top-right',    label: 'Top Right',    style: { top: '14%', right: '10%' } },
  { id: 'bottom-left',  label: 'Bottom Left',  style: { bottom: '22%', left: '10%' } },
  { id: 'bottom-right', label: 'Bottom Right', style: { bottom: '22%', right: '10%' } },
]

function NotifCard({ stacked, count }: { stacked: boolean; count: number }) {
  const cards = stacked ? Math.min(count, 3) : 1
  return (
    <span className="notif-card-stack">
      {Array.from({ length: cards }).map((_, i) => (
        <span key={i} className="notif-card" style={{ top: i * 7, left: i * 3, zIndex: cards - i, opacity: 1 - i * 0.25 }}>
          <span className="notif-card-dot" />
          <span className="notif-card-lines">
            <span className="notif-card-line long" />
            <span className="notif-card-line medium" />
          </span>
        </span>
      ))}
    </span>
  )
}

function DesktopNotifSettings({ count, setCount, corner, setCorner }: {
  count: number
  setCount: (n: number) => void
  corner: string
  setCorner: (c: string) => void
}) {
  return (
    <div className="notif-desktop-section">
      <p className="notif-section-heading">Location on the screen</p>

      {/* Screen preview */}
      <div className="notif-screen-wrap">
        <div className="notif-screen">
          {CORNERS.map((c) => (
            <button
              key={c.id}
              className={`notif-corner-zone${corner === c.id ? ' active' : ''}`}
              style={c.style}
              onClick={() => setCorner(c.id)}
            >
              <NotifCard stacked={corner === c.id} count={count} />
            </button>
          ))}
        </div>
        <div className="notif-screen-stand" />
        <div className="notif-screen-base" />
      </div>

      {/* Count picker */}
      <p className="notif-section-heading" style={{ marginTop: 28 }}>Notifications count</p>
      <div className="settings-group">
        <div className="notif-count-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`notif-count-btn${count === n ? ' active' : ''}`}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900)
  const [notifCount, setNotifCount] = useState(3)
  const [notifCorner, setNotifCorner] = useState('bottom-right')

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const [states, setStates] = useState<NotifToggleState>({
    messageNotif: true,
    messagePrev:  true,
    groupNotif:   true,
    groupPrev:    false,
    tourneyNotif: true,
    sound:        true,
    vibrate:      true,
    badge:        true,
    inAppSounds:  true,
    inAppVibrate: false,
  })

  const set = (key: keyof NotifToggleState) => (val: boolean) => setStates(s => ({ ...s, [key]: val }))

  const GROUPS = [
    {
      title: 'Private Messages',
      items: [
        { color: '#2196F3', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>, label: 'Message Notifications', sub: 'Alerts for new messages', toggle: 'messageNotif' as keyof NotifToggleState },
        { color: '#34AADC', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>, label: 'Message Preview', sub: 'Show text in notification', toggle: 'messagePrev' as keyof NotifToggleState },
      ]
    },
    {
      title: 'Groups & Community',
      items: [
        { color: '#4CAF50', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, label: 'Group Notifications', sub: 'Alerts for group activity', toggle: 'groupNotif' as keyof NotifToggleState },
        { color: '#FF9500', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>, label: 'Group Preview', sub: 'Show group name in notification', toggle: 'groupPrev' as keyof NotifToggleState },
      ]
    },
    {
      title: 'Tournaments & Arcade',
      items: [
        { color: '#AF52DE', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>, label: 'Tournament Alerts', sub: 'Match start, results, prizes', toggle: 'tourneyNotif' as keyof NotifToggleState },
      ]
    },
    {
      title: 'Sound & Vibration',
      items: [
        { color: '#F44336', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>, label: 'Sound', sub: 'Play sound for notifications', toggle: 'sound' as keyof NotifToggleState },
        { color: '#5856D6', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 15h2c0 3.31 2.69 6 6 6v-2c-2.21 0-4-1.79-4-4H2c0 4.42 3.58 8 8 8v-2c-3.31 0-6-2.69-6-6zm8 0c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v8zm9-8.08V3h-2v3.92C13.84 7.57 13 8.68 13 10c0 1.32.84 2.43 2 2.08V21h2v-8.92C18.16 12.43 19 11.32 19 10c0-1.32-.84-2.43-2-2.08z"/></svg>, label: 'Vibrate', sub: 'Vibrate for notifications', toggle: 'vibrate' as keyof NotifToggleState },
        { color: '#FF9F0A', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.53 15.48 1 13.5 1c-1.32 0-2.5.78-3.5 2.1C9 1.78 7.82 1 6.5 1 4.52 1 2 2.53 2 4.64c0 .48.11.92.18 1.36H0v2h2v11h20V8h2V6h-4zM6.5 3c1.14 0 2.33 1.93 2.5 3h-3c-1.11 0-2-.64-2-1.36C4 3.56 5.67 3 6.5 3zM4 17V8h7v9H4zm9 0V8h7v9h-7z"/></svg>, label: 'App Icon Badge', sub: 'Show unread count on icon', toggle: 'badge' as keyof NotifToggleState },
      ]
    },
    {
      title: 'In-App Notifications',
      items: [
        { color: '#30B0C7', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>, label: 'In-App Sounds', sub: 'Sounds while using the app', toggle: 'inAppSounds' as keyof NotifToggleState },
        { color: '#636366', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 15h2c0 3.31 2.69 6 6 6v-2c-2.21 0-4-1.79-4-4H2c0 4.42 3.58 8 8 8v-2c-3.31 0-6-2.69-6-6zm8 0c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v8zm6 0c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v8z"/></svg>, label: 'In-App Vibration', sub: 'Vibrate while using the app', toggle: 'inAppVibrate' as keyof NotifToggleState },
      ]
    },
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

        <h1 className="settings-title">Notifications</h1>

        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="notif-group-title">{group.title}</p>
            <div className="settings-group">
              {group.items.map(({ color, icon, label, sub, toggle }) => (
                <div key={label} className="settings-row notif-row">
                  <span className="settings-row-icon" style={{ background: color }}>{icon}</span>
                  <span className="settings-row-text">
                    <span className="settings-row-label">{label}</span>
                    <span className="settings-row-sub">{sub}</span>
                  </span>
                  <Toggle on={states[toggle]} onChange={set(toggle)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {isDesktop && (
          <DesktopNotifSettings
            count={notifCount}
            setCount={setNotifCount}
            corner={notifCorner}
            setCorner={setNotifCorner}
          />
        )}

      </div>
    </main>
  )
}
