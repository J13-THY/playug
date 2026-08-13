import { useNavigate, useParams } from 'react-router-dom'

const EVENTS = {
  'ludo-cup': {
    badge: 'HAPPENING NOW',
    eventType: 'SPECIAL EVENT',
    title: 'Ludo World Cup',
    desc: 'Compete against players from across Africa and become the Ludo Champion! Join millions of players in the biggest Ludo tournament ever hosted on the African continent.',
    bg: '/ludo-board.jpg',
    appIcon: '/dp.jpg',
    appName: 'Ludo Champion',
    appSub: 'Classic Board Game',
    route: '/games/ludo',
  },
  'chess-masters': {
    badge: 'NOW AVAILABLE',
    eventType: 'NEW RELEASE',
    title: 'Chess Grand Masters',
    desc: "Uganda's finest chess players face off in the ultimate tournament. Study your openings, sharpen your endgame, and claim the title of Grand Master.",
    bg: '/chess.jpg',
    appIcon: '/dp.jpg',
    appName: 'Chess Master Pro',
    appSub: 'Strategy Board Game',
    route: '/games/ludo',
  },
  'checkers-league': {
    badge: 'HAPPENING NOW',
    eventType: 'TOURNAMENT',
    title: 'Draughts African League',
    desc: 'The continent-wide Draughts league is underway. Represent your country, defeat opponents, and rise to the top of the African leaderboard.',
    bg: '/checkers.jpg',
    appIcon: '/dp.jpg',
    appName: 'Draughts Champion',
    appSub: 'Classic Board Game',
    route: '/games/ludo',
  },
}

export default function GameEventPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const event = EVENTS[id] || EVENTS['ludo-cup']

  return (
    <main className="main-content">
      <div className="gev-page">

        <button className="account-back-btn" onClick={() => navigate('/games')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Games
        </button>

        <div className="gev-layout">
          {/* Left — image */}
          <div className="gev-image-col">
            <img src={event.bg} alt={event.title} className="gev-image" />
          </div>

          {/* Right — info */}
          <div className="gev-info-col">
            <span className="gev-badge">{event.badge}</span>
            <p className="gev-event-type">{event.eventType}</p>
            <h1 className="gev-title">{event.title}</h1>
            <p className="gev-desc">{event.desc}</p>

            {/* App row + View */}
            <div className="gev-footer">
              <img src={event.appIcon} alt={event.appName} className="gev-app-icon" />
              <div className="gev-app-info">
                <span className="gev-app-name">{event.appName}</span>
                <span className="gev-app-sub">{event.appSub}</span>
              </div>
              <button className="gev-view-btn" onClick={() => navigate(event.route)}>View</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
