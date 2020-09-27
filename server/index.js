require('dotenv').config();
const express = require('express');
const path = require('path');

const { dbrouter } = require('../routes/dbroutes');
const { authRouter } = require('../routes/authroutes');
const { apiRouter } = require('../routes/apiroutes');

//----------------------------------------------------------------------------------

const app = express();
const { PORT } = process.env;
// Body parser V
app.use(express.json());

// static files and route utilities
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/', dbrouter);
app.use('/', authRouter);
app.use('/api', apiRouter);

// app listener for env PORT
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // checking if server is listening
  console.log(`App listening on ${PORT}!`);
});
