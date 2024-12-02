// backend/src/config/database.js
const mongoose = require('mongoose');
const ENV = require('./environment');

const connectDatabase = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };