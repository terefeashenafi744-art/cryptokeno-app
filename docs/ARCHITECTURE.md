# CryptoKeno Architecture

## Overview

CryptoKeno is a cross-platform real-time gaming application built with:
- **Android**: Kotlin + Jetpack Compose
- **iOS**: Swift + SwiftUI
- **Backend**: Node.js + Express + WebSockets + Firebase

## Architecture Diagram

```
┌─────────────┐         ┌─────────────┐
│   Android   │         │     iOS     │
│   (Kotlin)  │         │   (Swift)   │
└──────┬──────┘         └──────┬──────┘
       │                       │
       └───────────┬───────────┘
                   │
        ┌──────────▼──────────┐
        │   WebSocket (WSS)   │
        │   Real-time Events  │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │  Node.js Backend    │
        │  (Express + WS)     │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │  Firebase Services  │
        │ - Firestore (DB)    │
        │ - Auth              │
        │ - Cloud Messaging   │
        └─────────────────────┘
```

## Component Architecture

### Android
```
src/main/kotlin/com/cryptokeno/app/
├── ui/
│   ├── screens/       # Compose screens
│   ├── components/    # Reusable components
│   └── theme/         # Theme & styles
├── data/
│   ├── models/        # Data classes
│   ├── remote/        # Network services
│   └── local/         # Room database
└── di/                # Dependency injection
```

### iOS
```
CryptoKeno/
├── Views/             # SwiftUI views
├── ViewModels/        # MVVM ViewModels
├── Models/            # Data models
├── Services/          # Business logic
└── App/               # App entry point
```

### Backend
```
src/
├── index.ts           # Server entry point
├── services/          # Business logic
├── routes/            # API routes
└── utils/             # Utilities
```

## Data Flow

1. **Game Initiation**
   - Client creates game via REST API
   - Backend creates game in Firestore
   - Players connect via WebSocket

2. **Real-time Updates**
   - Game state changes are emitted via WebSocket
   - All connected clients receive updates
   - UI updates reactively

3. **Leaderboard**
   - Backend updates every 5 seconds
   - Clients receive leaderboard data via WebSocket
   - UI displays real-time rankings

## Security

- Firebase Authentication for user management
- WebSocket message validation
- Helmet.js for HTTP security headers
- CORS enabled for cross-origin requests
- Environment variables for sensitive data
