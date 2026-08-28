import SwiftUI

struct ContentView: View {
    @State private var showingPlaySheet = false
    
    var body: some View {
        ZStack {
            Color(red: 0.07, green: 0.07, blue: 0.07).ignoresSafeArea()
            
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("CryptoKeno")
                        .font(.system(size: 36, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text("Real-Time Crypto Gaming")
                        .font(.system(size: 16, weight: .regular))
                        .foregroundColor(.gray)
                }
                .padding(.top, 32)
                
                Spacer().frame(height: 32)
                
                GameCardView(title: "Keno", description: "Classic Keno with crypto rewards")
                GameCardView(title: "Live Leaderboard", description: "Real-time player rankings")
                GameCardView(title: "Multiplayer", description: "Play with friends worldwide")
                
                Spacer()
                
                Button(action: { showingPlaySheet = true }) {
                    Text("Play Now")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 56)
                        .background(Color(red: 0.38, green: 0, blue: 0.93))
                        .cornerRadius(12)
                }
                
                Button(action: {}) {
                    Text("Connect Wallet")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 56)
                        .background(Color(red: 0.12, green: 0.12, blue: 0.12))
                        .cornerRadius(12)
                }
            }
            .padding(16)
        }
    }
}

struct GameCardView: View {
    let title: String
    let description: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 18, weight: .semibold))
                .foregroundColor(Color(red: 0.38, green: 0, blue: 0.93))
            
            Text(description)
                .font(.system(size: 12, weight: .regular))
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .frame(height: 100)
        .padding(16)
        .background(Color(red: 0.12, green: 0.12, blue: 0.12))
        .cornerRadius(12)
    }
}

#Preview {
    ContentView()
}
