const express = require('express');
const passport = require('passport');
const { Room } = require('../database/models/models');
require('../auth/googleStrategy');

const authRouter = express.Router();
// authentication for Google Oauth via profile validation
authRouter.get('/auth/google',
  passport.authenticate('google', {
    scope:
    ['profile', 'email'],
  }));

authRouter.get('/auth/google/callback',
  passport.authenticate('google', {
    // if authenication succeeds, redirect to homepage.
    failureRedirect: '/fail',
    successRedirect: '/',
  }), (req, res) => {
    res.send(req.user);
  });

// if the authentication fails
authRouter.get('/fail', (req, res) => {
  res.send('Failed to login: try again');
});

// redirect to the auth login page
authRouter.get('/login', (req, res) => {
  res.redirect('/auth/google');
});

// redirect to the login page if user logs out
authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// responds with user information if route is hit
authRouter.get('/session', (req, res) => {
  res.send(req.user);
});

/**
 *  authenticates a private room if password credentials match with original from the database.
 *  @func getPassword retrieves password based on specific room id.
 */
authRouter.get('/roomauth', (req, res) => {
  Room.getPassword(req.query)
    .then((password) => {
      res.status(200).send(password);
    })
    .catch(() => res.status(500).end());
});

/**
 *  creates a new password for a private room.
 *  @func createPassword records password data as a record in database.
 */
authRouter.post('/roomauth', (req, res) => {
  Room.createPassword(req.body)
    .then(() => {
      res.status(201).end();
    })
    .catch(() => res.status(500).end());
  res.end();
});

// Export router for rendering to server.

module.exports = {
  authRouter,
};
