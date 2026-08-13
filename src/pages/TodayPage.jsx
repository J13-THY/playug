import { TODAY_CARDS } from '../data/todayCards'

export default function TodayPage() {
  const CARDS = TODAY_CARDS
  return (
    <main className="main-content">
      <section className="today-section">
        <h2 className="today-title">Today</h2>

        <div className="today-grid">
          {CARDS.map((card) => (
            <div key={card.title} className="today-card">
              <div className="today-card-image">
                <img src={card.image} alt={card.appName} className="card-bg-img" />
                <div className={`today-badge${card.badgeBlue ? ' blue' : ''}`}>{card.badge}</div>
                <div className="today-card-overlay">
                  <p className="today-event-type">{card.eventType}</p>
                  <h3 className="today-card-title">{card.title}</h3>
                  <p className="today-card-subtitle">{card.subtitle}</p>
                </div>
              </div>

              <div className="today-card-footer">
                <div className="today-app-info">
                  <div className="today-app-icon-small">
                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`grad-${card.appName}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: card.iconGradient[0] }} />
                          <stop offset="100%" style={{ stopColor: card.iconGradient[1] }} />
                        </linearGradient>
                      </defs>
                      <rect width="48" height="48" rx="10" fill={`url(#grad-${card.appName})`} />
                      <path d="M 24,10 L 20,15 L 18,20 L 20,25 L 18,30 L 28,30 L 26,25 L 28,20 L 26,15 Z" fill="#FFD700" />
                    </svg>
                  </div>
                  <div className="today-app-details">
                    <h4>{card.appName}</h4>
                    <p>{card.appCategory}</p>
                  </div>
                </div>
                <button className="today-view-btn">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
