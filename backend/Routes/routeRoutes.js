const express = require('express');
const RouteController = require('../controllers/routeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes
router.post('/optimize', authMiddleware, RouteController.optimizeRoute);
router.get('/history', authMiddleware, RouteController.getRouteHistory);
router.delete('/:id', authMiddleware, RouteController.deleteRoute);

module.exports = router;
