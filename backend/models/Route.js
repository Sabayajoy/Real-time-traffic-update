const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  endLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  optimizationDetails: {
    congestionLevel: { type: Number, default: 1 },
    estimatedTime: { type: Number, required: true },
    distance: { type: Number, required: true }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Route', RouteSchema);