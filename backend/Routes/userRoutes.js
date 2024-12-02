const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes
router.put('/preferences', authMiddleware, UserController.updatePreferences);

module.exports = router;