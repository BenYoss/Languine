const express = require('express');
const passport = require('passport');
const { Room } = require('../database/models/models');
require('../auth/googleStrategy');

const authRouter = express.Router();

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

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

authRouter.get('/session', (req, res) => {
  console.log(req.user, req.session, 'test');
  res.send(req.user);
});

authRouter.get('/roomauth', (req, res) => {
  Room.getPassword(req.query)
    .then((password) => {
      res.status(200).send(password);
    })
    .catch(() => res.status(500).end());
});

authRouter.post('/roomauth', (req, res) => {
  console.log(req.body);
  Room.createPassword(req.body)
    .then(() => {
      console.log('SUCCESS');
      res.status(201).end();
    })
    .catch(() => res.status(500).end());
  res.end();
});

module.exports = {
  authRouter,
};
