import express from 'express';
import { Server } from 'ws';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_KEY as any),
});

const db = admin.firestore();

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const snapshot = await db
      .collection('leaderboard')
      .orderBy('winnings', 'desc')
      .limit(100)
      .get();

    const leaderboard = snapshot.docs.map((doc, index) => ({
      rank: index + 1,
      ...doc.data(),
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/games/:gameId', async (req, res) => {
  try {
    const gameDoc = await db.collection('games').doc(req.params.gameId).get();
    if (!gameDoc.exists) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(gameDoc.data());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// WebSocket Handlers
const gameConnections = new Map();
const leaderboardConnections = new Set();

wss.on('connection', (ws, req) => {
  const url = req.url || '';

  if (url.startsWith('/games/')) {
    const gameId = url.split('/')[2];
    if (!gameConnections.has(gameId)) {
      gameConnections.set(gameId, new Set());
    }
    gameConnections.get(gameId)!.add(ws);

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        // Broadcast to all clients in this game
        gameConnections.get(gameId)!.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (error) {
        console.error('Message error:', error);
      }
    });

    ws.on('close', () => {
      gameConnections.get(gameId)!.delete(ws);
    });
  } else if (url === '/leaderboard') {
    leaderboardConnections.add(ws);

    ws.on('close', () => {
      leaderboardConnections.delete(ws);
    });
  }
});

// Broadcast leaderboard updates every 5 seconds
setInterval(async () => {
  try {
    const snapshot = await db
      .collection('leaderboard')
      .orderBy('winnings', 'desc')
      .limit(100)
      .get();

    const leaderboard = snapshot.docs.map((doc, index) => ({
      rank: index + 1,
      ...doc.data(),
    }));

    leaderboardConnections.forEach((ws) => {
      if (ws.readyState === 1) {
        ws.send(JSON.stringify(leaderboard));
      }
    });
  } catch (error) {
    console.error('Leaderboard update error:', error);
  }
}, 5000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
