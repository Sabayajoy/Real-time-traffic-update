const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const ENV = require('./config/environment');

// Import routes
const userRoutes = require('./Routes/userRoutes');
const routeRoutes = require('./Routes/routeRoutes');

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectToDatabase();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes() {
    // Define routes
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/routes', routeRoutes);

    // Global error handler
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
      });
    });
  }

  async connectToDatabase() {
    try {
      await connectDatabase();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
    }
  }

  start() {
    this.app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  }
}

module.exports = new App();