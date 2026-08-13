import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignOutModal({ onCancel, onConfirm }) {
  return (
    <div className="signout-backdrop" onClick={onCancel}>
      <div className="signout-modal" onClick={e => e.stopPropagation()}>
        <h2 className="signout-title">Sign Out</h2>
        <p className="signout-body">Are you sure you want to sign out of your wePlay-UG account?</p>
        <p className="signout-note">You can sign back in at any time to resume playing your games.</p>
        <div className="signout-actions">
          <button className="signout-cancel" onClick={onCancel}>CANCEL</button>
          <button className="signout-confirm" onClick={onConfirm}>SIGN OUT</button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const [showSignOut, setShowSignOut] = useState(false)
  const SETTINGS_GROUPS = [
    {
      items: [
        {
          color: '#2196F3',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>,
          label: 'My Account',
          sub: 'Number, Username, Bio',
          chevron: true,
        },
      ]
    },
    {
      items: [
        {
          color: '#FF9500',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>,
          label: 'Chat Settings',
          sub: 'Wallpaper, Night Mode, Animations',
          chevron: true,
        },
        {
          color: '#4CAF50',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
          label: 'Privacy & Security',
          sub: 'Last Seen, Devices, Passkeys',
          chevron: true,
        },
        {
          color: '#F44336',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>,
          label: 'Notifications',
          sub: 'Sounds, Calls, Badges',
          chevron: true,
        },
        {
          color: '#5856D6',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>,
          label: 'Data and Storage',
          sub: 'Media download settings',
          chevron: true,
        },
        {
          color: '#34AADC',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.53 15.48 1 13.5 1c-1.32 0-2.5.78-3.5 2.1C9 1.78 7.82 1 6.5 1 4.52 1 2 2.53 2 4.64c0 .48.11.92.18 1.36H0v2h2v11h20V8h2V6h-4zM6.5 3c1.14 0 2.33 1.93 2.5 3h-3c-1.11 0-2-.64-2-1.36C4 3.56 5.67 3 6.5 3zM4 17V8h7v9H4zm9 0V8h7v9h-7z"/></svg>,
          label: 'Appearance',
          sub: 'Theme, Font Size, Dark Mode',
          chevron: true,
        },
        {
          color: '#32ADE6',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,
          label: 'Devices',
          sub: 'Manage connected devices',
          chevron: true,
        },
        {
          color: '#FF9F0A',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>,
          label: 'Power Saving',
          sub: 'Reduce power usage on low charge',
          chevron: true,
        },
        {
          color: '#AF52DE',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>,
          label: 'Language',
          sub: 'English',
          chevron: true,
          value: 'English',
        },
      ]
    },
    {
      items: [
        {
          color: '#30B0C7',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.01 7.01 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4a.484.484 0 0 0-.48.41l-.36 2.54a7.37 7.37 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.05.24.27.41.49.41h4c.22 0 .44-.17.47-.41l.36-2.54a7.37 7.37 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>,
          label: 'Advanced',
          sub: 'Experimental and developer settings',
          chevron: true,
        },
        {
          color: '#636366',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>,
          label: 'Help & Support',
          sub: 'FAQ, Contact us',
          chevron: true,
        },
      ]
    },
    {
      items: [
        {
          color: '#FF3B30',
          icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>,
          label: 'Sign Out',
          sub: 'Log out of your account',
          chevron: false,
          danger: true,
        },
      ]
    },
  ]

  return (
    <main className="main-content">
      <div className="settings-page">

        <h1 className="settings-title">Settings</h1>

        {/* Profile Card */}
        <div className="settings-profile-card">
          <div className="settings-avatar">
            <img src="/dp.jpg" alt="Profile" />
          </div>
          <div className="settings-profile-info">
            <h2 className="settings-username">LudoChampion</h2>
            <p className="settings-handle">+256 700 000 000</p>
            <p className="settings-bio">@ludochampion</p>
          </div>
          <div className="settings-qr-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h6v6H3zm2 2v2h2V5zm8-2h6v6h-6zm2 2v2h2V5zM3 13h6v6H3zm2 2v2h2v-2zm13-2h1v1h-1zm-3 0h1v1h-1zm1 1h1v1h-1zm-1 1h1v1h-1zm1 1h1v1h-1zm1 0h1v1h-1zm1-1h1v1h-1zm0 2h1v1h-1z"/>
            </svg>
          </div>
        </div>

        {/* Settings Groups */}
        {SETTINGS_GROUPS.map((group, gi) => (
          <div key={gi} className="settings-group">
            {group.items.map(({ color, icon, label, sub, chevron, value, danger }) => (
              <button key={label} className={`settings-row${danger ? ' settings-row--danger' : ''}`}
                onClick={() => {
                  if (label === 'My Account') navigate('/account')
                  if (label === 'Privacy & Security') navigate('/privacy-security')
                  if (label === 'Notifications') navigate('/notifications')
                  if (label === 'Language') navigate('/language')
                  if (label === 'Appearance') navigate('/appearance')
                  if (label === 'Sign Out') setShowSignOut(true)
                }}>
                <span className="settings-row-icon" style={{ background: color }}>{icon}</span>
                <span className="settings-row-text">
                  <span className="settings-row-label">{label}</span>
                  {sub && !value && <span className="settings-row-sub">{sub}</span>}
                </span>
                {value && <span className="settings-row-value">{value}</span>}
                {chevron && (
                  <svg className="settings-row-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        ))}

      </div>

      {showSignOut && (
        <SignOutModal
          onCancel={() => setShowSignOut(false)}
          onConfirm={() => { setShowSignOut(false); navigate('/') }}
        />
      )}
    </main>
  )
}
