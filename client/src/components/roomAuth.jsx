import React, { useState, useEffect } from 'react';
import { getPassword } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoomAuth({ room, userId, user }) {
  const [pass, setPass] = useState('');
  const [, setReload] = useState([]);

  const comparePass = (password) => {
    console.log(password);
    getPassword(room, password)
      .then((bool) => {
        if (bool) {
          window.location.href = `/discussion?name=${userId}&room=${room}&user=${user}`;
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input placeholder="Password" className="Room-Input" type="password" onChange={(ev) => setPass(ev.target.value)} />
      {pass.length ? (
        <button type="submit" onClick={() => { comparePass(pass); }}>Submit</button>
      ) : ''}
    </div>
  );
}

export default RoomAuth;
