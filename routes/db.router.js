const express = require('express');
const {
  User, Room, Message, Ban,
} = require('../database/models/models');

// dbrouter acts as a new router instance.
const dbrouter = express.Router();

/**
 * GET users from the database based on field search critera
 * @func findUsers
 */
dbrouter.get('/users', (req, res) => {
  User.findUsers(req.query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).end();
    });
});

dbrouter.post('/users', (req, res) => {
  User.addUser(req.body)
    .then(() => {
      res.status(201).send('this is the poster for users');
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/rooms', (req, res) => {
  Room.getRooms(req.query)
    .then((rooms) => {
      res.status(200).send(rooms);
    })
    .catch(() => res.status(500).end());
  // res.send('this is the getter for rooms');
});

dbrouter.post('/rooms', (req, res) => {
  Room.addRoom(req.body)
    .then(() => {
    })
    .catch(() => res.status(500).end());
  res.send('rooms');
});

dbrouter.delete('/rooms', (req, res) => {
  Room.deleteRoom(req.query)
    .then(() => {
      res.status(200).send('room deleted');
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/languages', (req, res) => {
  res.status(200).send('this is the getter for languages');
});

dbrouter.get('/messages', (req, res) => {
  Message.getMessages(req.query)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch(() => res.status(500).end());
});

dbrouter.post('/messages', (req, res) => {
  Message.addMessage(req.body)
    .then(() => {
      console.log('message saved to DB');
      res.status(201).end();
    })
    .catch(() => res.status(500).end());
});

dbrouter.delete('/messages', (req, res) => {
  Message.deleteMessage(req.query)
    .then(() => {
      console.log('message removed from DB');
      res.status(200).end();
    })
    .catch(() => res.status(500).end());
});

dbrouter.get('/files', (req, res) => {
  res.status(200).send('this is the getter for files');
});

dbrouter.get('/banned', (req, res) => {
  const { roomId } = req.query;

  Ban.getBannedUsers(roomId)
    .then((bannedUsers) => {
      res.status(200).send(bannedUsers);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbrouter.post('/banned', (req, res) => {
  const { userId, roomId } = req.body;

  Ban.banUser(userId, roomId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbrouter.delete('/banned', (req, res) => {
  const { userId, roomId } = req.query;

  Ban.pardonUser(userId, roomId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = {
  dbrouter,
};
