require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../database/models/models').User;
//------------------------------------------------------------------

// dotEnv vars
const cliID = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

// for recording the user information
passport.serializeUser((user, done) => {
  // console.log(user.id, 'This user id!');
  done(null, user);
});

// for recording userID
passport.deserializeUser((idUser, done) => {
  done(null, idUser);
});

// Google strategy for initializing authenticator
// Use this for obtaining data from user profiles.
passport.use(new GoogleStrategy({
  clientID: cliID,
  clientSecret: secret,
  callbackURL: 'http://localhost:8080/auth/google/callback',
},
(req, accessToken, refreshToken, profile, done) => {
  // variable for notation convenience
  const notation = '_json';
  // destructuring properties in profile
  const {
    name, sub, picture, locale,
  } = profile[notation];
  // Profile data then gets saved into database
  userModel.addUser(name, picture, 'fill me', sub, locale)
    .then(() => {
      console.log(`${name}has been added!`);
    })
    .catch((err) => { console.error(err); });
  done(null, profile);
}));
