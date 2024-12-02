const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const ENV = require('./config/environment');
const RouteOptimizer = require('./services/routeOptimizer');
const RouteController = require('./controllers/routeController');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO Real-time Updates
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('requestRouteOptimization', async (routeData) => {
    try {
      const optimizedRoute = await RouteOptimizer.calculateOptimalRoute(routeData);
      socket.emit('routeOptimizationResult', optimizedRoute);
    } catch (error) {
      socket.emit('error', 'Route optimization failed');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.post('/api/route/optimize', RouteController.optimizeRoute);

// Start server
const startServer = async () => {
  await connectDatabase();
  server.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

startServer();