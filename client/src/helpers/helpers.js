import axios from 'axios';

const getUser = () => new Promise((res, rej) => {
  axios.get('/session')
    .then((id) => {
      axios.get('/users', { params: { id_google: `${id.data.join('0')}` } })
        .then((userData) => {
          res(userData.data[0]);
        })
        .catch((err) => rej(err));
    });
});

export default getUser;
