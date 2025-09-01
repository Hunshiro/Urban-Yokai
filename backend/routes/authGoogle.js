const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // User is authenticated and session is set by passport
  res.redirect('/');
});

module.exports = router;
