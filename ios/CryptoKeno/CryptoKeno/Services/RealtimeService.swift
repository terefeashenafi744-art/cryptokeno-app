import Foundation
import Combine

class RealtimeService: NSObject, URLSessionWebSocketDelegate {
    static let shared = RealtimeService()
    
    private var webSocket: URLSessionWebSocket?
    private var receiveTask: URLSessionWebSocketTask?
    public let gameUpdates = PassthroughSubject<GameState, Never>()
    public let leaderboardUpdates = PassthroughSubject<[LeaderboardEntry], Never>()
    
    func connectGameUpdates(gameId: String) {
        let urlString = "wss://api.cryptokeno.com/games/\(gameId)"
        guard let url = URL(string: urlString) else { return }
        
        webSocket = URLSession.shared.webSocketTask(with: url)
        webSocket?.resume()
        receiveMessage()
    }
    
    func connectLeaderboard() {
        guard let url = URL(string: "wss://api.cryptokeno.com/leaderboard") else { return }
        
        webSocket = URLSession.shared.webSocketTask(with: url)
        webSocket?.resume()
        receiveMessage()
    }
    
    private func receiveMessage() {
        webSocket?.receive { [weak self] result in
            switch result {
            case .success(let message):
                switch message {
                case .string(let text):
                    if let data = text.data(using: .utf8),
                       let gameState = try? JSONDecoder().decode(GameState.self, from: data) {
                        self?.gameUpdates.send(gameState)
                    }
                case .data(let data):
                    if let gameState = try? JSONDecoder().decode(GameState.self, from: data) {
                        self?.gameUpdates.send(gameState)
                    }
                @unknown default:
                    break
                }
                self?.receiveMessage()
            case .failure(let error):
                print("WebSocket error: \(error)")
            }
        }
    }
    
    func disconnect() {
        webSocket?.cancel(with: .goingAway, reason: nil)
    }
}
