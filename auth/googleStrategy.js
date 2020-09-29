require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// dotEnv vars
const cliID = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

passport.serializeUser((user, done) => {
  console.log(user.id, "This user id!");
  done(null, user);
});

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
  const { displayName, id } = profile;
  const thumbnail = profile.photos[0].value;
  // Testing data transfer, will correct later.
  console.log(thumbnail, displayName, id);
  done(null, profile);
}));
