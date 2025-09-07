const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

// Register
router.post('/register', async (req, res) => {
  res.status(403).json({ error: 'Registration disabled' });
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === ADMIN_USER && password === ADMIN_PASS) {
      // Simple token for admin
      const token = 'admin-token';
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Me
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    if (token === 'admin-token') {
      res.json({
        _id: 'admin',
        email: ADMIN_USER,
        role: 'admin',
        username: 'Admin'
      });
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
