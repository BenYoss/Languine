import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="join-header">Join</h1>
        <div>
          <input placeholder="" className="User-Input" type="text" onChange={(ev) => setName(ev.target.value)} />
          <input placeholder="" className="Room-Input" type="text" onChange={(ev) => setRoom(ev.target.value)} />
          <Link to={`/discussion?name=${name}&room=${room}`}>
            <button className="button" type="submit">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
