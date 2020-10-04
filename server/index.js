require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const socketio = require('socket.io');
const http = require('http');
const session = require('express-session');

const { User, Room } = require('../database/models/models');
const { dbrouter } = require('../routes/db.router.js');
const { authRouter } = require('../routes/auth.router.js');
const { apiRouter } = require('../routes/api.router.js');

//----------------------------------------------------------------------------------

const app = express();
const { PORT } = process.env;
const server = http.createServer(app);
const io = socketio(server, { wsEngine: 'ws' });
const userInfo = {};
// Body parser V
app.use(express.json());

app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24, // one day max age
  },
  resave: true,
  saveUninitialized: false,
  name: 'google.oauth2',
}));
// initialize passport for auth configuration
app.use(passport.initialize());
app.use(passport.session());

// to serve encoded bundle
app.use(express.static(path.join(__dirname, '../client/dist')));

io.on('connection', (socket) => {
  console.log('A new connection has been made!');

  socket.on('join', ({ name, room, desc }) => {
    // console.log(name, room);
    User.findUsers({ id_google: name })

      .then((userData) => {
        // console.log(userData[0]);
        const userDex = userData[0];
        Room.addRoom(room, desc || 'default text, add more here', true)
          .then(({ _id }) => {
            // console.log(_id);
            User.updateUserRoom(name, _id)
              .then(() => {
                userInfo[socket.id] = userDex;
                userInfo[socket.id].id_room = _id;
                socket.emit('message', { user: 'admin', text: `Welcome ${userData[0].username} to ${room}` });
                socket.broadcast.to(room).emit('message', { user: 'admin', text: `${userData[0].username} has joined the room!` });
                socket.join(room);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });

  socket.on('sendMessage', (message) => {
    const user = userInfo[socket.id];
    Room.getRooms({ _id: user.id_room })
      .then((dataRoom) => {
        console.log('roomPing');
        io.to(dataRoom[0].name).emit('message', { user: user.username, text: message, img: user.thumbnail });
      })
      .catch((err) => console.error(err));
  });

  socket.on('disconnect', ({ name }) => {
    User.updateUserRoom(name, 'NA')
      .then((result) => {
        // console.log(result, 'Had been removed');
        console.log('A disconnection has been made!');
      })
      .catch((err) => console.error(err));
  });
});

// static files and route utilities
app.use('/', dbrouter);
app.use('/', authRouter);
app.use('/api', apiRouter);

// route to serve static html and client-side routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// app listener for env PORT
server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // checking if server is listening
  console.log(`App listening on ${PORT}!`);
});
