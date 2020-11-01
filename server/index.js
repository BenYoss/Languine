require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const socketio = require('socket.io');
const http = require('http');
const multer = require('multer');
const session = require('express-session');

const { User, Room, Message } = require('../database/models/models');
const { dbrouter } = require('../routes/db.router.js');
const { authRouter } = require('../routes/auth.router.js');
const { apiRouter } = require('../routes/api.router.js');

//----------------------------------------------------------------------------------

const app = express();
const { PORT } = process.env;
const server = http.createServer(app);
const io = socketio(server, { wsEngine: 'ws' });
const userInfo = {};

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by');
app.use(multerMid.single('fileUpload'));
// Body parser V
app.use(express.json());
app.use(session({
  secret: 'some random secret',
  cookie: {},
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
  console.log('A new connection has been made!', socket.id);
  socket.on('join', ({
    name, room, desc, pub,
  }) => {
    User.findUsers({ id_google: name })
      .then((userData) => {
        const userDex = userData[0];
        Room.addRoom(room, desc || 'default text, add more here', pub, userData[0].id_google)
          .then(({ _id }) => {
            User.updateUserRoom(name, _id)
              .then(() => {
                userInfo[socket.id] = userDex;
                userInfo[socket.id].id_room = _id;
                Message.addMessage('admin', _id, `Welcome ${userData[0].username} to ${room}`, 'admin', 'https://www.vippng.com/png/detail/214-2149231_hard-hat-blue-icon-habitat-for-humanity-icons.png')
                  .then(() => {
                    socket.emit('message', { user: 'admin', text: `Welcome ${userData[0].username} to ${room}` });
                    socket.broadcast.to(room).emit('message', { user: 'admin', text: `${userData[0].username} has joined the room!` });
                    socket.join(room);
                  });
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
        Message.addMessage(user.id_google, user.id_room, message, user.username, user.thumbnail)
          .then((result) => {
            console.log(result, 'success', message);
            io.to(dataRoom[0].name).emit('message', { user: user.username, text: message, img: user.thumbnail });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });

  socket.on('disconnect', () => {
    const user = userInfo[socket.id];
    if (user) {
      Room.getRooms({ _id: user.id_room })
        .then((dataRoom) => {
          Message.addMessage('admin', user.id_room, `${user.username} has disconnected!`, 'admin', 'https://www.vippng.com/png/detail/214-2149231_hard-hat-blue-icon-habitat-for-humanity-icons.png')
            .then(() => {
              socket.join(dataRoom[0].name);
              User.updateUserRoom(user.id_google, 'null')
                .then()
                .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
    }
  });
});

// static files and route utilities
app.use('/', dbrouter);
app.use('/', authRouter);
app.use('/api', apiRouter);

// route to serve static html and client-side routes
app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/*', (req, res) => {
  if (!req.user) {
    res.redirect('/404');
  }
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
