require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');

const { dbrouter } = require('../routes/dbroutes');
const { authRouter } = require('../routes/authroutes');
const { apiRouter } = require('../routes/apiroutes');

//----------------------------------------------------------------------------------

const app = express();
const { PORT } = process.env;
// Body parser V
app.use(express.json());

// initialize passport for auth configuration
app.use(passport.initialize());

// to serve encoded bundle
app.use(express.static(path.join(__dirname, '../client/dist')));

// static files and route utilities
app.use('/', dbrouter);
app.use('/', authRouter);
app.use('/api', apiRouter);

// route to serve static html and client-side routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// app listener for env PORT
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // checking if server is listening
  console.log(`App listening on ${PORT}!`);
});
