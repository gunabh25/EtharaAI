const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (NOTE: In production, hash the password with bcrypt!)
    user = new User({
      firstName,
      lastName,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}&backgroundColor=transparent`
    });

    await user.save();
    
    // In production, return a JWT token here
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // NOTE: In production, compare hashed password using bcrypt.compare
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // In production, return a JWT token here
    res.json({ message: 'Login successful', user: { id: user._id, email: user.email, name: `${user.firstName} ${user.lastName}` } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
