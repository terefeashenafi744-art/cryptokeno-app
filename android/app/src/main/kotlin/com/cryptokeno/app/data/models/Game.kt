package com.cryptokeno.app.data.models

import kotlinx.serialization.Serializable

@Serializable
data class GameState(
    val id: String,
    val gameType: String,
    val status: GameStatus,
    val players: List<Player>,
    val selectedNumbers: List<Int>,
    val winningNumbers: List<Int>,
    val prize: Double,
    val timestamp: Long
)

@Serializable
data class Player(
    val id: String,
    val username: String,
    val balance: Double,
    val bet: Double,
    val winnings: Double = 0.0
)

@Serializable
enum class GameStatus {
    WAITING, PLAYING, FINISHED, CANCELLED
}

@Serializable
data class LeaderboardEntry(
    val userId: String,
    val username: String,
    val rank: Int,
    val winnings: Double,
    val gamesPlayed: Int
)
