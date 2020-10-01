import axios from 'axios';

export const getUser = () => new Promise((res, rej) => {
  axios.get('/session')
    .then((id) => {
      axios.get('/users', { params: { id_google: `${id.data.join('0')}` } })
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
    .catch((err) => rej(err));
});
