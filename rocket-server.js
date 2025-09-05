const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('.'));

const gameState = {
  players: {},
  terrain: null,
  landingPad: null,
  gameStarted: false
};

function generateTerrain() {
  const terrainPoints = [];
  const terrainSegments = 50;
  for (let i = 0; i <= terrainSegments; i++) {
    const x = (i / terrainSegments) * 40 - 20;
    const y = -8 + Math.sin(i * 0.3 + Math.random() * 2) * 2 + Math.random() * 1;
    terrainPoints.push({ x, y });
  }

  const padIndex = Math.floor(Math.random() * (terrainPoints.length - 5)) + 2;
  const padX = terrainPoints[padIndex].x;
  let terrainHeight = terrainPoints[padIndex].y;

  for (let i = Math.max(0, padIndex - 2); i <= Math.min(terrainPoints.length - 1, padIndex + 2); i++) {
    terrainHeight = Math.max(terrainHeight, terrainPoints[i].y);
  }
  const padY = terrainHeight + 0.1;

  return {
    points: terrainPoints,
    landingPad: { x: padX, y: padY, width: 2 }
  };
}

gameState.terrain = generateTerrain();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  const playerColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa726', '#ab47bc'];
  const colorIndex = Object.keys(gameState.players).length % playerColors.length;

  gameState.players[socket.id] = {
    id: socket.id,
    position: { x: (Math.random() - 0.5) * 10, y: 5 },
    velocity: { x: (Math.random() - 0.5) * 2, y: 0 },
    rotation: 0,
    fuel: 100,
    color: playerColors[colorIndex],
    gameOver: false,
    won: false,
    connected: true
  };

  socket.emit('gameState', {
    terrain: gameState.terrain,
    players: gameState.players,
    yourId: socket.id
  });

  socket.broadcast.emit('playerJoined', gameState.players[socket.id]);

  socket.on('playerUpdate', (data) => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].position = data.position;
      gameState.players[socket.id].velocity = data.velocity;
      gameState.players[socket.id].rotation = data.rotation;
      gameState.players[socket.id].fuel = data.fuel;
      gameState.players[socket.id].gameOver = data.gameOver;
      gameState.players[socket.id].won = data.won;

      socket.broadcast.emit('playerUpdate', {
        playerId: socket.id,
        ...data
      });
    }
  });

  socket.on('restartGame', () => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].position = { x: (Math.random() - 0.5) * 10, y: 5 };
      gameState.players[socket.id].velocity = { x: (Math.random() - 0.5) * 2, y: 0 };
      gameState.players[socket.id].rotation = 0;
      gameState.players[socket.id].fuel = 100;
      gameState.players[socket.id].gameOver = false;
      gameState.players[socket.id].won = false;

      io.emit('playerRestart', socket.id);
    }
  });

  socket.on('newLevel', () => {
    gameState.terrain = generateTerrain();

    Object.keys(gameState.players).forEach(playerId => {
      gameState.players[playerId].position = { x: (Math.random() - 0.5) * 10, y: 5 };
      gameState.players[playerId].velocity = { x: (Math.random() - 0.5) * 2, y: 0 };
      gameState.players[playerId].rotation = 0;
      gameState.players[playerId].fuel = 100;
      gameState.players[playerId].gameOver = false;
      gameState.players[playerId].won = false;
    });

    io.emit('newLevel', {
      terrain: gameState.terrain,
      players: gameState.players
    });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    delete gameState.players[socket.id];
    socket.broadcast.emit('playerLeft', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Multiplayer Rocket Game server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}/rocket-multiplayer.html to play`);
});
