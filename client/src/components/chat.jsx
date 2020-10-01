import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar';

let socket;

function Chat() {
  const [username, setName] = useState('');
  const [roomType, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = query.parse(window.location.search);

    socket = io('localhost:8080');

    setName(name);
    setRoom(room);
    console.log(query.parse(window.location.search));
    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, ['localhost:8080', window.location.search]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div>
      <h1>This will be the chat</h1>
      <h2>
        {username}
        {' '}
        in Room:
        {' '}
        {roomType}
      </h2>

      <div>
        <InfoBar room={roomType} />
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
        />
      </div>
    </div>
  );
}

export default Chat;
