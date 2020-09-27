const express = require('express');
const passport = require('passport');
require('../auth/googleStrategy');

const authRouter = express.Router();

authRouter.get('/auth/google',
  passport.authenticate('google', {
    scope:
    ['https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'],
  }));

authRouter.get('/auth/google/callback',
  passport.authenticate('google', {
    // if authenication succeeds, redirect to homepage.
    successRedirect: '/login',
    failureRedirect: '/fail',
  }));

// if the authentication fails
authRouter.get('/fail', (req, res) => {
  res.send('Failed to login: try again');
});

// redirect to the auth login page
authRouter.get('/login', (req, res) => {
  res.redirect('/auth/google');
});

module.exports = {
  authRouter,
};
