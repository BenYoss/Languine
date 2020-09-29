import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';

let socket;

function Chat() {
  const [nameo, setName] = useState('');
  const [roomo, setRoom] = useState('');

  useEffect(() => {
    const { name, room } = query.parse(window.location.search);

    socket = io('localhost:8080');

    setName(name);
    setRoom(room);
    console.log(query.parse(window.location.search));
    socket.emit('join', { name, room }, ({ err }) => {
      alert(err);
    });
  }, ['localhost:8080', window.location.search]);

  return (
    <div>
      <h1>This will be the chat</h1>
      <h2>
        {nameo}
        {' '}
        and
        {' '}
        {roomo}
      </h2>
    </div>
  );
}

export default Chat;
