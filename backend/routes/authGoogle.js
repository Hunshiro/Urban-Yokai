const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // Redirect back to frontend after successful login
    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
);

module.exports = router;
