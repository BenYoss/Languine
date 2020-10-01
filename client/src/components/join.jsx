import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getUser from '../helpers/helpers';

function Join() {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    getUser()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="join-header">Join</h1>
        <div>
          <input placeholder={user.username} className="User-Input" type="text" onChange={(ev) => setUser(ev.target.value)} />
          <input placeholder="" className="Room-Input" type="text" onChange={(ev) => setRoom(ev.target.value)} />
          <Link to={`/discussion?name=${user.id_google}&room=${room}`}>
            <button className="button" type="submit">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
