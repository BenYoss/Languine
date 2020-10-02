import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../helpers/helpers';

function Join() {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [desc, setDesc] = useState('');

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
        <h1 className="join-header">Create Room</h1>
        <div>
          <input placeholder="Roomname" className="Room-Input" type="text" onChange={(ev) => setRoom(ev.target.value)} />
          <input placeholder="Description" className="Desc-Input" type="text" onChange={(ev) => setDesc(ev.target.value)} />
          <Link to={`/discussion?name=${user.id_google}&room=${room}&user=${user.username}&desc=${desc}`}>
            <button className="button" type="submit">Create Room</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
