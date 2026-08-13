export type ToggleProps = {
  on: boolean
  onChange: (val: boolean) => void
}

export type GameAccount = {
  id: string
  name: string
  balance: string
  raw: number
  color: string
  icon: string
}

export type Transaction = {
  id: number
  type: 'deposit' | 'withdrawal' | 'transfer' | 'stake' | 'win'
  label: string
  amount: string
  date: string
  color: string
  account: string
}

export type MatchRequest = {
  id: number
  from: string
  game: string
  stake: string
  avatar: string
  online: boolean
}

export type DashAchievement = {
  icon: string
  title: string
  desc: string
  unlocked: boolean
}

export type NotifToggleState = {
  messageNotif: boolean
  messagePrev: boolean
  groupNotif: boolean
  groupPrev: boolean
  tourneyNotif: boolean
  sound: boolean
  vibrate: boolean
  badge: boolean
  inAppSounds: boolean
  inAppVibrate: boolean
}
