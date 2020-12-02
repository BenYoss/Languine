import axios from 'axios';
import crypto from 'crypto-js';

// GetAccount is a function that returns a promise instance which will contain the information
// pertaining to the current user session.
export const getAccount = () => new Promise((res, rej) => {
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

export const deleteRoom = (room) => new Promise((res, rej) => {
  axios.delete('/rooms', { params: { _id: room } })
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

export const deleteMessages = (room) => new Promise((res, rej) => {
  axios.delete('/messages', { params: { id_room: room } })
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

export const getFiles = (idUser) => new Promise((res, rej) => {
  axios.get('/api/uploads', { params: { id_user: idUser } })
    .then((files) => {
      res(files.data);
    })
    .catch((err) => rej(err));
});

export const getFile = (id) => new Promise((res, rej) => {
  axios.get('/api/uploads', { params: { _id: id } })
    .then((file) => {
      res(file.data[0]);
    })
    .catch((err) => rej(err));
});

export const getUsers = () => new Promise((res, rej) => {
  axios.get('/users')
    .then((users) => {
      res(users.data);
    })
    .catch((err) => rej(err));
});

export const getUser = (name) => new Promise((res, rej) => {
  axios.get('/users', { params: { username: name } })
    .then((data) => {
      res(data.data);
    })
    .catch((err) => rej(err));
});

export const getPassword = (room, inputPass) => new Promise((res, rej) => {
  axios.get('/roomauth', { params: { roomName: room } })
    .then((password) => {
      let isMatching = false;
      const decryptedPass = crypto.AES.decrypt(password.data.password, 'test').toString(crypto.enc.Utf8);
      if (decryptedPass === inputPass) {
        isMatching = true;
      }
      res(isMatching);
    })
    .catch((err) => rej(err));
});

export const hash = (pass) => {
  const encryptedPass = crypto.AES.encrypt(pass, 'test').toString();
  return encryptedPass;
};

export const addPassword = (pass, room) => new Promise((res, rej) => {
  console.log(pass, room);
  axios.post('/roomauth', { password: pass, roomName: room })
    .then((data) => {
      res(data.data);
    })
    .catch((err) => rej(err));
});

export const deleteFile = (file) => new Promise((res, rej) => {
  axios.delete('/api/bucket', { params: { id: file } })
    .then((fileData) => {
      res(fileData);
    })
    .catch((err) => rej(err));
});

export const pardonUser = (idUser, idRoom) => new Promise((res, rej) => {
  axios.delete('/banned', { params: { useId: idUser, roomId: idRoom } })
    .then((fileData) => {
      res(fileData);
    })
    .catch((err) => rej(err));
});

export const banUser = (idUser, idRoom) => new Promise((res, rej) => {
  axios.post('/banned', { userId: idUser, roomId: idRoom })
    .then((fileData) => {
      res(fileData);
    })
    .catch((err) => rej(err));
});

export const getBannedUsers = (idRoom) => new Promise((res, rej) => {
  axios.get('/banned', { params: { roomId: idRoom } })
    .then(({ data }) => {
      res(data);
    })
    .catch((err) => rej(err));
});
