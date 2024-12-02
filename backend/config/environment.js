// backend/src/config/environment.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/transportation-mvp',
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
};