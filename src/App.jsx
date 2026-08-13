import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'

const GamesPage = lazy(() => import('./pages/GamesPage'))
const GamesDiscoverPage = lazy(() => import('./pages/GamesDiscoverPage'))
const GameEventPage = lazy(() => import('./pages/GameEventPage'))
const TodayPage = lazy(() => import('./pages/TodayPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const AppsPage = lazy(() => import('./pages/AppsPage'))
const ArcadePage = lazy(() => import('./pages/ArcadePage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))
const LanguagePage = lazy(() => import('./pages/LanguagePage'))
const TournamentMTN = lazy(() => import('./pages/TournamentMTN'))
const TournamentCocaCola = lazy(() => import('./pages/TournamentCocaCola'))
const TournamentAirtel = lazy(() => import('./pages/TournamentAirtel'))
const TournamentRedBull = lazy(() => import('./pages/TournamentRedBull'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const FinancesPage = lazy(() => import('./pages/FinancesPage'))
const AppearancePage = lazy(() => import('./pages/AppearancePage'))
const PrivacySecurityPage = lazy(() => import('./pages/PrivacySecurityPage'))
const CommunityOnboardingPage = lazy(() => import('./pages/CommunityOnboardingPage'))
const AutoDeletePage = lazy(() => import('./pages/AutoDeletePage'))
const DraughtsGame = lazy(() => import('./pages/DraughtsGame'))

function RouteFallback() {
  return <div className="route-loading" aria-live="polite">Loading...</div>
}

export default function App() {
  return (
    <>
      <Sidebar />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/dashboard"   element={<DashboardPage />} />
          <Route path="/finances"    element={<FinancesPage />} />
          <Route path="/appearance"        element={<AppearancePage />} />
          <Route path="/privacy-security"  element={<PrivacySecurityPage />} />
          <Route path="/auto-delete"        element={<AutoDeletePage />} />
          <Route path="/"            element={<GamesDiscoverPage />} />
          <Route path="/today"       element={<TodayPage />} />
          <Route path="/games"            element={<GamesDiscoverPage />} />
          <Route path="/games/ludo"       element={<GamesPage />} />
          <Route path="/games/event/:id"  element={<GameEventPage />} />
          <Route path="/privacy"     element={<PrivacyPage />} />
          <Route path="/apps"        element={<AppsPage />} />
          <Route path="/arcade"      element={<ArcadePage />} />
          <Route path="/community"          element={<CommunityOnboardingPage />} />
          <Route path="/community/feed"     element={<CommunityPage />} />
          <Route path="/settings"    element={<SettingsPage />} />
          <Route path="/account"       element={<AccountPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/language"      element={<LanguagePage />} />
          <Route path="/tournament/mtn"      element={<TournamentMTN />} />
          <Route path="/tournament/cocacola" element={<TournamentCocaCola />} />
          <Route path="/tournament/airtel"   element={<TournamentAirtel />} />
          <Route path="/tournament/redbull"  element={<TournamentRedBull />} />
          <Route path="/games/draughts"      element={<DraughtsGame />} />
        </Routes>
      </Suspense>
    </>
  )
}
