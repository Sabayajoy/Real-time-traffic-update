const mongoose = require('mongoose');

const TrafficDataSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  congestionLevel: {
    type: Number,
    required: true,
    enum: [1, 2, 3] // Low, Medium, High
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('TrafficData', TrafficDataSchema);
