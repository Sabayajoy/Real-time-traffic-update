// src/utils/apiClient.js
const axios = require('axios');
const ENV = require('../config/environment');

class APIClient {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Fetch directions
  async getDirections(origin, destination) {
    try {
      const response = await this.client.get('/directions/json', {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          key: ENV.GOOGLE_MAPS_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Directions API error:', error);
      throw error;
    }
  }

  // Fetch traffic data
  async getTrafficData(location) {
    try {
      const response = await this.client.get('/roads/v1/nearestRoads', {
        params: {
          points: `${location.lat},${location.lng}`,
          key: ENV.GOOGLE_MAPS_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Traffic Data API error:', error);
      throw error;
    }
  }
}

module.exports = new APIClient();