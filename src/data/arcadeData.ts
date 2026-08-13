export type Tournament = {
  id: string
  sponsor: string
  sponsorColor: string
  sponsorTextColor: string
  sponsorAccent: string
  sponsorLogo?: string
  title: string
  game: string
  prize: string
  players: number
  maxPlayers: number
  endsIn: string
  status: 'LIVE' | 'SOON'
  grad: [string, string]
  route: string
}

export type LeaderboardEntry = {
  rank: number
  name: string
  score: number
  country: string
  crown: boolean
}

export type Challenge = {
  id: string
  title: string
  reward: string
  icon: string
  progress: number
  total: number
  claimed?: boolean
}

export type Achievement = {
  id: string
  title: string
  desc: string
  icon: string
  unlocked: boolean
}

export const LIVE_TOURNAMENTS: Tournament[] = [
  {
    id: 'mtn',
    sponsor: 'MTN',
    sponsorColor: '#0057A8',
    sponsorTextColor: '#FFCC00',
    sponsorAccent: '#FFCC00',
    sponsorLogo: 'https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo-footer.svg',
    title: 'MTN Pulse Ludo Cup',
    game: 'Ludo Champion',
    prize: 'UGX 5,000,000',
    players: 3200,
    maxPlayers: 4096,
    endsIn: '2d 14h',
    status: 'LIVE',
    grad: ['#0057A8', '#003D7A'],
    route: '/tournament/mtn',
  },
  {
    id: 'cocacola',
    sponsor: 'Coca-Cola',
    sponsorColor: '#F40009',
    sponsorTextColor: '#FFFFFF',
    sponsorAccent: '#FF4444',
    title: 'Coca-Cola Chess Masters',
    game: 'Chess Master Pro',
    prize: 'UGX 3,000,000',
    players: 890,
    maxPlayers: 1024,
    endsIn: '6h 30m',
    status: 'LIVE',
    grad: ['#F40009', '#8B0000'],
    route: '/tournament/cocacola',
  },
  {
    id: 'airtel',
    sponsor: 'Airtel',
    sponsorColor: '#FF0000',
    sponsorTextColor: '#FFFFFF',
    sponsorAccent: '#FF6600',
    title: 'Airtel Draughts League',
    game: 'Draughts Champion',
    prize: 'UGX 2,000,000',
    players: 420,
    maxPlayers: 512,
    endsIn: '4d 2h',
    status: 'SOON',
    grad: ['#FF4500', '#CC0000'],
    route: '/tournament/airtel',
  },
  {
    id: 'redbull',
    sponsor: 'Red Bull',
    sponsorColor: '#CC0000',
    sponsorTextColor: '#FFFFFF',
    sponsorAccent: '#FFD700',
    title: 'Red Bull Quiz Blitz',
    game: 'Quiz Battles',
    prize: 'UGX 1,500,000',
    players: 192,
    maxPlayers: 256,
    endsIn: '1d 8h',
    status: 'LIVE',
    grad: ['#1a1a2e', '#CC0000'],
    route: '/tournament/redbull',
  },
]

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1,  name: 'DiceKing99',    score: 98_450, country: '🇳🇬', crown: true  },
  { rank: 2,  name: 'QueenOfBoards', score: 95_210, country: '🇿🇦', crown: false },
  { rank: 3,  name: 'RollMaster_X',  score: 91_780, country: '🇰🇪', crown: false },
  { rank: 4,  name: 'LudoLegend',    score: 88_340, country: '🇬🇭', crown: false },
  { rank: 5,  name: 'SixSixSix',     score: 85_120, country: '🇺🇬', crown: false },
  { rank: 6,  name: 'StrategyGod',   score: 81_970, country: '🇮🇳', crown: false },
  { rank: 7,  name: 'CrownChaser',   score: 78_550, country: '🇧🇷', crown: false },
  { rank: 8,  name: 'NightOwlGamer', score: 75_900, country: '🇵🇭', crown: false },
]

export const WEEKLY_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Win 5 matches in a row',          reward: '500 XP',  icon: '🏆', progress: 3, total: 5   },
  { id: 'c2', title: 'Roll six three times in one game', reward: '200 XP',  icon: '🎲', progress: 1, total: 3   },
  { id: 'c3', title: 'Play 10 multiplayer games',        reward: '300 XP',  icon: '🎮', progress: 7, total: 10  },
  { id: 'c4', title: 'Reach top 100 leaderboard',        reward: '1000 XP', icon: '⭐', progress: 0, total: 1   },
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'First Blood',      desc: 'Win your first match',              icon: '🩸', unlocked: true  },
  { id: 'a2', title: 'Hat Trick',        desc: 'Win 3 games in a row',              icon: '🎩', unlocked: true  },
  { id: 'a3', title: 'Board Master',     desc: 'Win 100 total games',               icon: '👑', unlocked: true  },
  { id: 'a4', title: 'Speed Demon',      desc: 'Win a match in under 3 minutes',    icon: '⚡', unlocked: false },
  { id: 'a5', title: 'Social Butterfly', desc: 'Play with 50 different opponents',  icon: '🦋', unlocked: false },
  { id: 'a6', title: 'Night Owl',        desc: 'Play 10 games after midnight',      icon: '🦉', unlocked: false },
]
