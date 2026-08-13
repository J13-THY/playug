export const FEATURED_BUNDLES = [
  {
    tag: "EDITORS' CHOICE",
    tagBlue: true,
    title: 'Board Games That Changed Everything',
    subtitle: 'Five classics reimagined for the modern screen.',
    gradient: ['#0f0c29', '#302b63', '#24243e'],
  },
  {
    tag: 'NEW THIS WEEK',
    tagBlue: false,
    title: 'Puzzle Games for Deep Thinkers',
    subtitle: 'Challenge every neuron with these mind-benders.',
    gradient: ['#134e5e', '#71b280'],
  },
]

export const TOP_FREE = [
  { rank: 1,  name: 'LudoChampion',     category: 'Board',   grad: ['#667eea', '#764ba2'], badge: 'NEW'  },
  { rank: 2,  name: 'Chess Clash',       category: 'Strategy',grad: ['#f093fb', '#f5576c'], badge: null   },
  { rank: 3,  name: 'Snakes & Dice',     category: 'Casual',  grad: ['#4facfe', '#00f2fe'], badge: null   },
  { rank: 4,  name: 'Carrom Star',       category: 'Sports',  grad: ['#43e97b', '#38f9d7'], badge: null   },
  { rank: 5,  name: 'Uno Fever',         category: 'Card',    grad: ['#fa709a', '#fee140'], badge: 'HOT'  },
  { rank: 6,  name: 'Scrabble Go',       category: 'Word',    grad: ['#a18cd1', '#fbc2eb'], badge: null   },
  { rank: 7,  name: 'Risk Global War',   category: 'Strategy',grad: ['#ffecd2', '#fcb69f'], badge: null   },
  { rank: 8,  name: 'Dominos World',     category: 'Board',   grad: ['#ff9a9e', '#fad0c4'], badge: null   },
]

export const TOP_PAID = [
  { rank: 1,  name: 'Catan Universe',    category: 'Strategy',grad: ['#d4a843', '#8b5e1a'], badge: null  },
  { rank: 2,  name: 'Ticket to Ride',    category: 'Board',   grad: ['#e74c3c', '#922b21'], badge: null  },
  { rank: 3,  name: 'Pandemic Board',    category: 'Co-op',   grad: ['#2c3e50', '#34495e'], badge: null  },
  { rank: 4,  name: 'Azul Digital',      category: 'Puzzle',  grad: ['#1abc9c', '#16a085'], badge: 'NEW' },
  { rank: 5,  name: 'Wingspan',          category: 'Strategy',grad: ['#27ae60', '#1e8449'], badge: null  },
]

export const CATEGORIES_GRID = [
  { label: 'Action',      grad: ['#ff416c', '#ff4b2b'] },
  { label: 'Adventure',   grad: ['#4e54c8', '#8f94fb'] },
  { label: 'Puzzle',      grad: ['#11998e', '#38ef7d'] },
  { label: 'Strategy',    grad: ['#f7971e', '#ffd200'] },
  { label: 'Sports',      grad: ['#56ccf2', '#2f80ed'] },
  { label: 'Racing',      grad: ['#eb3349', '#f45c43'] },
  { label: 'Simulation',  grad: ['#8360c3', '#2ebf91'] },
  { label: 'RPG',         grad: ['#c94b4b', '#4b134f'] },
]

export const EDITOR_PICKS = [
  { name: 'Realm of Kings',  category: 'Strategy / RPG',    grad: ['#1a1a2e', '#e94560'],  desc: 'Build your empire from rubble to glory.' },
  { name: 'Neon Racer X',    category: 'Racing / Arcade',   grad: ['#0f3460', '#16213e'],  desc: 'Hyper-speed tracks through a cyberpunk city.' },
  { name: 'Zen Garden 3D',   category: 'Puzzle / Casual',   grad: ['#134e5e', '#71b280'],  desc: 'Find peace one stone at a time.' },
]
