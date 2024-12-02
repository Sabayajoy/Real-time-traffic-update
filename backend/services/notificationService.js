const nodemailer = require('nodemailer');
const ENV = require('../config/environment');

class NotificationService {
  constructor() {
    // Configure email transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
      }
    });
  }

  // Send route optimization notification
  async sendRouteOptimizationEmail(user, routeDetails) {
    try {
      const mailOptions = {
        from: ENV.EMAIL_USER,
        to: user.email,
        subject: 'Your Optimized Route Details',
        html: `
          <h1>Route Optimization Notification</h1>
          <p>Hello ${user.name},</p>
          <p>We've optimized your route:</p>
          <ul>
            <li>Estimated Time: ${routeDetails.estimatedTime} minutes</li>
            <li>Congestion Level: ${this.getCongestionDescription(routeDetails.congestionLevel)}</li>
          </ul>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Notification email sent successfully');
    } catch (error) {
      console.error('Failed to send notification email:', error);
    }
  }

  // Send traffic alert
  async sendTrafficAlert(user, alertDetails) {
    try {
      const mailOptions = {
        from: ENV.EMAIL_USER,
        to: user.email,
        subject: 'Traffic Alert',
        html: `
          <h1>Traffic Alert</h1>
          <p>Hello ${user.name},</p>
          <p>${alertDetails.message}</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send traffic alert:', error);
    }
  }

  // Helper method to describe congestion level
  getCongestionDescription(level) {
    switch(level) {
      case 1: return 'Low Congestion';
      case 2: return 'Medium Congestion';
      case 3: return 'High Congestion';
      default: return 'Unknown Congestion';
    }
  }
}

module.exports = new NotificationService();