import axios from 'axios';

export const getUser = () => new Promise((res, rej) => {
  axios.get('/session')
    .then((session) => {
      axios.get('/users', { params: { id_google: `${session.data.id}` } })
        .then((userData) => {
          res(userData.data[0]);
        })
        .catch((err) => rej(err));
    });
});

export const getRoom = (roomname) => new Promise((res, rej) => {
  axios.get('/rooms', { params: { name: roomname } })
    .then((roomData) => {
      res(roomData.data);
    })
    .catch((err) => rej(err));
});

export const getRooms = () => new Promise((res, rej) => {
  axios.get('/rooms')
    .then((roomData) => {
      res(roomData.data);
    })
    .catch((err) => rej(err));
});

export const deleteRoom = () => new Promise((res, rej) => {
  axios.delete('/rooms')
    .then(() => {
      res('deleted');
    })
    .catch((err) => rej(err));
});

export const getMessages = (room) => new Promise((res, rej) => {
  axios.get('/messages', { params: { id_room: room } })
    .then((messages) => {
      res(messages.data);
    })
    .catch((err) => rej(err));
});

export const deleteMessage = (message) => new Promise((res, rej) => {
  axios.delete('/messages', { params: { _id: message } })
    .then((messages) => {
      res(messages.data);
    })
    .catch((err) => rej(err));
});
