# CryptoKeno Setup Guide

## Prerequisites
- Node.js 16+
- Android SDK (for Android development)
- Xcode 14+ (for iOS development)
- Firebase project with Firestore enabled

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Realtime Database
   - Cloud Messaging
   - Storage

3. Download your Firebase credentials and save to `backend/.env`

## Android Setup

```bash
cd android
./gradlew clean build
./gradlew assembleDebug
```

Install on device:
```bash
./gradlew installDebug
```

## iOS Setup

```bash
cd ios/CryptoKeno
pod install
open CryptoKeno.xcworkspace
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

## API Documentation

### REST Endpoints

#### Health Check
- `GET /api/health`
- Returns: `{ status: 'ok', timestamp: number }`

#### Get Leaderboard
- `GET /api/leaderboard`
- Returns: Array of LeaderboardEntry

#### Get Game State
- `GET /api/games/:gameId`
- Returns: GameState

### WebSocket Endpoints

#### Game Updates
- `wss://api.cryptokeno.com/games/:gameId`
- Receives real-time game state updates

#### Leaderboard Updates
- `wss://api.cryptokeno.com/leaderboard`
- Receives leaderboard updates every 5 seconds

## Building for Release

### Android Release APK
```bash
cd android
./gradlew assembleRelease -PversionCode=1 -PversionName=1.0.0
```

### iOS Release Build
```bash
cd ios/CryptoKeno
xcodebuild -workspace CryptoKeno.xcworkspace -scheme CryptoKeno -configuration Release
```
