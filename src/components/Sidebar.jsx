import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="9" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="11" width="8" height="9" rx="2"/><rect x="3" y="15" width="8" height="5" rx="2"/></svg>),
  },
  {
    to: '/games',
    label: 'Games',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19Z"/><path d="M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5Z"/><path d="M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39ZM14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63C15.32 5.85 16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46Z"/><path d="M8.88 16.53L7.47 15.12C6.96 14.61 6.76 13.86 7 13.21L6.99 13.2C5.9 13.64 4.97 14.43 4.5 15.5C3.5 17.8 5 21 5 21C5 21 8.2 22.5 10.5 21.5C11.57 21.03 12.36 20.1 12.8 19.01L12.79 19C12.14 19.24 11.39 19.04 10.88 18.53L8.88 16.53Z"/></svg>),
  },
  {
    to: '/finances',
    label: 'Finances',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>),
  },
  {
    to: '/community',
    label: 'Community',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>),
  },
  {
    to: '/arcade',
    label: 'Tournaments',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.86 10.4 5 9.3 5 8zm14 0c0 1.3-.86 2.4-2 2.82V7h2v1z"/></svg>),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.01 7.01 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4a.484.484 0 0 0-.48.41l-.36 2.54a7.37 7.37 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.05.24.27.41.49.41h4c.22 0 .44-.17.47-.41l.36-2.54a7.37 7.37 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>),
  },
]

const ADS = [
  {
    id: 'mtn',
    bg: 'linear-gradient(135deg, #0057A8 0%, #003D7A 100%)',
    label: 'MTN PULSE',
    headline: 'Play More, Win More',
    sub: 'UGX 5M Prize Pool',
    accent: '#FFCC00',
  },
  {
    id: 'coca',
    bg: 'linear-gradient(135deg, #F40009 0%, #8B0000 100%)',
    label: 'COCA-COLA',
    headline: 'Taste the Winning Feeling',
    sub: 'Chess Masters Tournament',
    accent: '#ffffff',
  },
  {
    id: 'airtel',
    bg: 'linear-gradient(135deg, #FF4500 0%, #CC0000 100%)',
    label: 'AIRTEL',
    headline: 'Connect & Compete',
    sub: 'Draughts African League',
    accent: '#ffffff',
  },
  {
    id: 'redbull',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #CC0000 100%)',
    label: 'RED BULL',
    headline: 'Gives You Wings to Win',
    sub: 'Quiz Blitz Tournament',
    accent: '#FFD700',
  },
]

function SidebarAds() {
  const [adSlide, setAdSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setAdSlide(s => (s + 1) % ADS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const ad = ADS[adSlide]

  return (
    <div className="sidebar-ads">
      <p className="sidebar-ads-label">Sponsored</p>

      <div
        className="sidebar-ad-card"
        style={{ background: ad.bg }}
        onTouchStart={e => { window._adTouchX = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - (window._adTouchX || 0)
          if (Math.abs(dx) > 30) setAdSlide(s => (s + (dx < 0 ? 1 : -1) + ADS.length) % ADS.length)
        }}
      >
        <span className="sidebar-ad-brand" style={{ color: ad.accent }}>{ad.label}</span>
        <p className="sidebar-ad-headline">{ad.headline}</p>
        <p className="sidebar-ad-sub">{ad.sub}</p>
        <div className="sidebar-ad-dots">
          {ADS.map((_, i) => (
            <button
              key={i}
              className={`sidebar-ad-dot${adSlide === i ? ' active' : ''}`}
              onClick={() => setAdSlide(i)}
            />
          ))}
        </div>
      </div>

      <div className="sidebar-copyright">
        <p>© {new Date().getFullYear()} wePlay-UG Ltd.</p>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const sidebarRef = useRef(null)
  const overlayRef = useRef(null)
  const btnRef     = useRef(null)
  const closeRef   = useRef(null)

  useEffect(() => {
    const sidebar = sidebarRef.current
    const overlay = overlayRef.current

    const topBar = document.createElement('div')
    topBar.className = 'mobile-top-bar'
    topBar.innerHTML = `
      <button class="hamburger-menu-inline" aria-label="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <span class="mobile-brand"><span class="sidebar-brand-we">we</span><span class="sidebar-brand-play">PLAY</span><span class="sidebar-brand-ug">-UG</span></span>
    `
    document.body.prepend(topBar)

    const btn = topBar.querySelector('.hamburger-menu-inline')
    btnRef.current = btn

    const mainContent = document.querySelector('.main-content')

    const close = () => {
      sidebar.classList.remove('active')
      overlay.classList.remove('active')
      mainContent?.classList.remove('sidebar-open')
      document.body.style.overflow = ''
    }
    closeRef.current = close

    const toggle = () => {
      const open = sidebar.classList.toggle('active')
      overlay.classList.toggle('active', open)
      mainContent?.classList.toggle('sidebar-open', open)
      document.body.style.overflow = open ? 'hidden' : ''
    }

    btn.addEventListener('click', toggle)
    overlay.addEventListener('click', close)

    const onResize = () => {
      if (window.innerWidth > 900) close()
    }
    window.addEventListener('resize', onResize)

    return () => {
      btn?.removeEventListener('click', toggle)
      overlay.removeEventListener('click', close)
      window.removeEventListener('resize', onResize)
      topBar.remove()
    }
  }, [])

  const handleNavClick = () => {
    if (window.innerWidth <= 900 && closeRef.current) closeRef.current()
  }

  return (
    <>
      <aside className="sidebar" ref={sidebarRef}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-we">we</span><span className="sidebar-brand-play">PLAY</span><span className="sidebar-brand-ug">-UG</span>
        </div>
        <div className="search-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input type="search" placeholder="Search settings" />
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={handleNavClick}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <SidebarAds />
      </aside>

      <div className="sidebar-overlay" ref={overlayRef} />
    </>
  )
}
