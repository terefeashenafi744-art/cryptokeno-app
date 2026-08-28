import Foundation

struct GameState: Codable {
    let id: String
    let gameType: String
    let status: GameStatus
    let players: [Player]
    let selectedNumbers: [Int]
    let winningNumbers: [Int]
    let prize: Double
    let timestamp: Int64
}

struct Player: Codable {
    let id: String
    let username: String
    let balance: Double
    let bet: Double
    let winnings: Double
}

enum GameStatus: String, Codable {
    case waiting, playing, finished, cancelled
}

struct LeaderboardEntry: Codable {
    let userId: String
    let username: String
    let rank: Int
    let winnings: Double
    let gamesPlayed: Int
}
