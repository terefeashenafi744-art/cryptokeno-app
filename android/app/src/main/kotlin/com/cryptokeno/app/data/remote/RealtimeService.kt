package com.cryptokeno.app.data.remote

import io.ktor.client.*
import io.ktor.client.engine.android.*
import io.ktor.client.plugins.websocket.*
import io.ktor.client.request.*
import io.ktor.http.cio.websocket.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class RealtimeService {
    private val client = HttpClient(Android) {
        install(WebSockets)
    }

    fun observeGameUpdates(gameId: String): Flow<String> = flow {
        try {
            client.webSocket(urlString = "wss://api.cryptokeno.com/games/$gameId") {
                while (true) {
                    val frame = incoming.receive()
                    if (frame is Frame.Text) {
                        emit(frame.readText())
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun observeLeaderboard(): Flow<String> = flow {
        try {
            client.webSocket(urlString = "wss://api.cryptokeno.com/leaderboard") {
                while (true) {
                    val frame = incoming.receive()
                    if (frame is Frame.Text) {
                        emit(frame.readText())
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
