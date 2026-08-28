import * as admin from 'firebase-admin';

const db = admin.firestore();

interface GameState {
  id: string;
  gameType: string;
  status: 'waiting' | 'playing' | 'finished' | 'cancelled';
  players: Player[];
  selectedNumbers: number[];
  winningNumbers: number[];
  prize: number;
  timestamp: number;
}

interface Player {
  id: string;
  username: string;
  balance: number;
  bet: number;
  winnings: number;
}

export class GameService {
  static async createGame(gameType: string, players: Player[]): Promise<GameState> {
    const gameId = db.collection('games').doc().id;
    const gameState: GameState = {
      id: gameId,
      gameType,
      status: 'waiting',
      players,
      selectedNumbers: [],
      winningNumbers: [],
      prize: 0,
      timestamp: Date.now(),
    };

    await db.collection('games').doc(gameId).set(gameState);
    return gameState;
  }

  static async updateGameStatus(
    gameId: string,
    status: GameState['status']
  ): Promise<void> {
    await db.collection('games').doc(gameId).update({ status });
  }

  static async recordPlayerWinnings(
    gameId: string,
    playerId: string,
    winnings: number
  ): Promise<void> {
    const leaderboardRef = db.collection('leaderboard').doc(playerId);
    const leaderboardDoc = await leaderboardRef.get();

    if (leaderboardDoc.exists) {
      const currentData = leaderboardDoc.data();
      await leaderboardRef.update({
        winnings: (currentData?.winnings || 0) + winnings,
        gamesPlayed: (currentData?.gamesPlayed || 0) + 1,
      });
    } else {
      await leaderboardRef.set({
        playerId,
        winnings,
        gamesPlayed: 1,
      });
    }
  }
}
