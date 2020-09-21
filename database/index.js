require('dotenv').config();
const mongoose = require('mongoose');

const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_DATABASE;

const db = mongoose.connect(`mongodb://${HOST}/${DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('database successfully connected!');
});

module.exports = {
    db,
};