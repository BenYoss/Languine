require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE = process.env.DB_DATABASE;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;

const db = mongoose.connect(`mongodb+srv://${USER}:${PASS}@chatbar-fullstack-crud.dghmy.mongodb.net/${DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('database successfully connected!');
});

module.exports = {
  db,
};
