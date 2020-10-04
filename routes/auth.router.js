const express = require('express');
const passport = require('passport');
require('../auth/googleStrategy');

const authRouter = express.Router();
let id;

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
    id = req.user.id;
    // console.log(req.session, 'ATDAYHF');
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
  res.redirect('/login');
});

authRouter.get('/session', (req, res) => {
  const splitter = id || 'no';
  console.log(req.user, req.session, 'test');
  res.send(req.user);
});

module.exports = {
  authRouter,
};
