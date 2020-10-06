const express = require('express');
const { User, Room, Message } = require('../database/models/models');

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

dbrouter.delete('/rooms', (req, res) => {
  Room.deleteRoom(req.query)
    .then(() => {
      res.send('room deleted');
    })
    .catch((err) => console.error(err));
});

dbrouter.get('/languages', (req, res) => {
  res.send('this is the getter for languages');
});

dbrouter.get('/messages', (req, res) => {
  Message.getMessages(req.query)
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => console.error(err));
});

dbrouter.post('/messages', (req, res) => {
  Message.addMessage(req.body)
    .then((result) => {
      console.log(result, 'message saved to DB');
    })
    .catch((err) => console.error(err));
  res.end();
});

dbrouter.delete('/messages', (req, res) => {
  Message.deleteMessage(req.query)
    .then((result) => {
      console.log(result, 'message saved to DB');
    })
    .catch((err) => console.error(err));
  res.end();
});

dbrouter.get('/files', (req, res) => {
  res.send('this is the getter for files');
});

module.exports = {
  dbrouter,
};
