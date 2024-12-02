const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../config/environment');

class UserController {
  // User registration
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        preferences: {}
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        ENV.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ 
        token, 
        user: { 
          id: user._id, 
          email: user.email, 
          name: user.name 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }

  // Update user preferences
  async updatePreferences(req, res) {
    try {
      const { preferences } = req.body;
      const userId = req.user.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { preferences },
        { new: true }
      );

      res.json(updatedUser.preferences);
    } catch (error) {
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  }
}

module.exports = new UserController();