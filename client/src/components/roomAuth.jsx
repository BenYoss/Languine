import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getPassword } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoomAuth({ room, userId, user }) {
  const [pass, setPass] = useState('');
  const [invalid, setInvalid] = useState(true);

  const comparePass = (password) => {
    console.log(password);
    getPassword(room, password)
      .then((bool) => {
        if (bool) {
          window.location.href = `/discussion?name=${userId}&room=${room}&user=${user}`;
        } else {
          setInvalid(false);
        }
        return '';
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {
        invalid ? (
          <div>
            <input placeholder="Password" className="Room-Input" type="password" onChange={(ev) => setPass(ev.target.value)} />
            {pass.length ? (
              <button type="submit" onClick={() => { comparePass(pass); }}>Submit</button>
            ) : ''}
          </div>
        ) : (
          <div>
            <input placeholder="Password" className="Room-Input border-danger" type="password" onChange={(ev) => setPass(ev.target.value)} />
            {pass.length ? (
              <button type="submit" onClick={() => { comparePass(pass); }}>Submit</button>
            ) : ''}
            <h4>Invalid Password!</h4>
          </div>
        )
      }
    </div>
  );
}

RoomAuth.propTypes = {
  room: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default RoomAuth;
