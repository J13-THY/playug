import { useState } from 'react'
import { FEATURED_BUNDLES, TOP_FREE, TOP_PAID, CATEGORIES_GRID, EDITOR_PICKS } from '../data/appsData'

function GradientIcon({ grad, size = 48, rx = 11, children }) {
  const id = `gi-${grad[0].replace('#', '')}`
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={grad[0]} />
          <stop offset="100%" stopColor={grad[1]} />
        </linearGradient>
      </defs>
      <rect width={size} height={size} rx={rx} fill={`url(#${id})`} />
      {children}
    </svg>
  )
}

export default function AppsPage() {
  const [tab, setTab] = useState('free')
  const list = tab === 'free' ? TOP_FREE : TOP_PAID

  return (
    <main className="main-content">
      {/* Hero bundles */}
      <section className="apps-hero-row">
        {FEATURED_BUNDLES.map((b, i) => (
          <div
            key={i}
            className="apps-bundle-card"
            style={{ background: `linear-gradient(135deg, ${b.gradient.join(', ')})` }}
          >
            <span className={`apps-bundle-tag${b.tagBlue ? ' blue' : ''}`}>{b.tag}</span>
            <h2 className="apps-bundle-title">{b.title}</h2>
            <p className="apps-bundle-sub">{b.subtitle}</p>
          </div>
        ))}
      </section>

      {/* Categories grid */}
      <section className="apps-section">
        <h2 className="apps-section-title">Browse by Category</h2>
        <div className="apps-categories-grid">
          {CATEGORIES_GRID.map(({ label, grad }) => (
            <button key={label} className="apps-category-tile" style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Top Charts */}
      <section className="apps-section">
        <div className="apps-section-header">
          <h2 className="apps-section-title">Top Charts</h2>
          <div className="apps-tabs">
            <button className={`apps-tab${tab === 'free' ? ' active' : ''}`} onClick={() => setTab('free')}>Free</button>
            <button className={`apps-tab${tab === 'paid' ? ' active' : ''}`} onClick={() => setTab('paid')}>Paid</button>
          </div>
        </div>
        <div className="apps-chart-list">
          {list.map(({ rank, name, category, grad, badge }) => (
            <div key={rank} className="apps-chart-row">
              <span className="apps-chart-rank">{rank}</span>
              <GradientIcon grad={grad} size={52} rx={12}>
                <rect x="14" y="14" width="24" height="24" rx="4" fill="rgba(255,255,255,0.3)" />
              </GradientIcon>
              <div className="apps-chart-info">
                <span className="apps-chart-name">{name}</span>
                <span className="apps-chart-cat">{category}</span>
              </div>
              {badge && <span className="apps-chart-badge">{badge}</span>}
              <button className="view-btn">Get</button>
            </div>
          ))}
        </div>
      </section>

      {/* Editor Picks */}
      <section className="apps-section">
        <h2 className="apps-section-title">Editor&apos;s Picks</h2>
        <div className="apps-picks-grid">
          {EDITOR_PICKS.map(({ name, category, grad, desc }) => (
            <div key={name} className="apps-pick-card" style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
              <GradientIcon grad={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} size={60} rx={14}>
                <circle cx="30" cy="30" r="10" fill="rgba(255,255,255,0.4)" />
              </GradientIcon>
              <h3 className="apps-pick-name">{name}</h3>
              <p className="apps-pick-cat">{category}</p>
              <p className="apps-pick-desc">{desc}</p>
              <button className="apps-pick-btn">View</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
