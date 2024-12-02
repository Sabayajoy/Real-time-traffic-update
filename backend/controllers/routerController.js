const RouteOptimizer = require('../services/routeOptimizer');

class RouteController {
  static async optimizeRoute(req, res) {
    try {
      const { start, end } = req.body;
      const optimizedRoute = await RouteOptimizer.calculateOptimalRoute({ start, end });
      res.json(optimizedRoute);
    } catch (error) {
      res.status(500).json({ message: 'Route optimization failed' });
    }
  }
}

module.exports = RouteController;