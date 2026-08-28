export interface GameState {
  id: string;
  gameType: string;
  status: 'waiting' | 'playing' | 'finished' | 'cancelled';
  players: Player[];
  selectedNumbers: number[];
  winningNumbers: number[];
  prize: number;
  timestamp: number;
}

export interface Player {
  id: string;
  username: string;
  balance: number;
  bet: number;
  winnings: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  rank: number;
  winnings: number;
  gamesPlayed: number;
}

export interface WalletInfo {
  address: string;
  balance: number;
  tokenBalance: number;
}

export interface GameRequest {
  gameType: string;
  playersNeeded: number;
  betAmount: number;
}
