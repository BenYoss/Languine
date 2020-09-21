require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('App listening on ' + PORT + '!');
})