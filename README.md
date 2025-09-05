# Rocket Space 🚀

A real-time multiplayer lunar lander game built with Node.js, Express, Socket.IO, and Three.js.

## Features

- **Multiplayer gameplay** - Multiple players can join and play simultaneously
- **Real-time physics** - Smooth rocket movement with realistic physics
- **Dynamic terrain** - Randomly generated terrain for each level
- **3D graphics** - Built with Three.js for immersive visuals
- **Mobile support** - Touch controls for mobile devices
- **Particle effects** - Thrust particles and explosion effects

## Game Controls

### Desktop
- **Arrow Keys** or **WASD** - Control rocket thrust and rotation
- **Spacebar** - Main thrust
- **Enter/Space** - Restart after game over

### Mobile
- **Touch buttons** - On-screen controls for mobile devices

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Kurubik/rocket-space.git
cd rocket-space
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3001/rocket-space.html
```

## Development

For development with auto-restart:
```bash
npm run dev
```

## How to Play

1. **Objective**: Land your rocket safely on the yellow landing pad
2. **Physics**: Your rocket is affected by gravity and momentum
3. **Fuel**: Monitor your fuel level - it decreases when using thrust
4. **Landing**: Land gently (low speed) and upright for a successful landing
5. **Multiplayer**: Watch other players' rockets in real-time
6. **New Level**: Generate new terrain after successful landing

## Technical Details

- **Backend**: Node.js with Express and Socket.IO for real-time communication
- **Frontend**: HTML5, CSS3, and Three.js for 3D rendering
- **Real-time updates**: WebSocket-based multiplayer synchronization
- **Physics**: Custom physics engine for rocket dynamics

## Project Structure

```
rocket-space/
├── rocket-server.js    # Node.js server with Socket.IO
├── rocket-space.html   # Game client with Three.js
├── package.json        # Project dependencies
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see the code for details.

## Deployment

### Remote Server Deployment

1. **Upload files** to your server
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the server**:
   ```bash
   node rocket-server.js
   ```
4. **Access the game** at:
   ```
   http://YOUR_SERVER_IP:3001/rocket-space.html
   ```

### Environment Variables

- `PORT` - Server port (default: 3001)
- `HOST` - Host binding (default: 0.0.0.0 for remote access)

### Production Setup

For production, consider using PM2:
```bash
npm install -g pm2
pm2 start rocket-server.js --name rocket-space
pm2 save
pm2 startup
```

The game is configured to use PORT and HOST environment variables for deployment platforms like Heroku, Railway, or VPS servers.

---

*Enjoy landing your rocket! 🌙*