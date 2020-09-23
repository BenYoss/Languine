require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const { PORT } = process.env;

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`App listening on ${PORT}!`);
});
