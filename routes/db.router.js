const express = require('express');
const { User, Room } = require('../database/models/models');

const dbrouter = express.Router();

dbrouter.get('/users', (req, res) => {
  User.findUsers(req.query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
  // res.send('this');
});

dbrouter.post('/users', (req, res) => {
  User.addUser(req.body)
    .then(() => {
      console.log('user successfully added!');
    })
    .catch((err) => console.error(err));

  res.send('this is the getter for users');
});

dbrouter.get('/rooms', (req, res) => {
  Room.getRooms(req.query)
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => console.error(err));
  // res.send('this is the getter for rooms');
});

dbrouter.post('/rooms', (req, res) => {
  Room.addRoom(req.body)
    .then((resu) => {
      console.log(resu, 'this works!');
    })
    .catch((err) => console.error(err));
  res.send('rooms');
});

dbrouter.get('/languages', (req, res) => {
  res.send('this is the getter for languages');
});

dbrouter.get('/messages', (req, res) => {
  res.send('this is the getter for messages');
});

dbrouter.get('/files', (req, res) => {
  res.send('this is the getter for files');
});

module.exports = {
  dbrouter,
};
