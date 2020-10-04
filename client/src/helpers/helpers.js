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

export const getRooms = () => new Promise((res, rej) => {
  axios.get('/rooms')
    .then((roomData) => {
      res(roomData.data);
    })
    .catch((err) => rej);
});
