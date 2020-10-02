import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar';
import Messages from './messages';
import '../styles/chat.css';

let socket;

function Chat() {
  // const [username, setName] = useState('');
  const [nameuser, setUser] = useState('');
  const [roomType, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const {
      name, room, user, desc,
    } = query.parse(window.location.search);

    socket = io('localhost:8080');

    // setName(name);
    setRoom(room);
    setUser(user);
    console.log(query.parse(window.location.search));
    socket.emit('join', { name, room, desc }, () => {

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
    <div className="background">
      <div className="container">
        <h1>This will be the chat</h1>
        <h2>
          {nameuser}
          {' '}
          in Room:
          {' '}
          {roomType}
        </h2>
        <InfoBar room={roomType} name={nameuser} />
        <Messages messages={messages} name={nameuser} />

        <div className="outercontainer">
          <form className="form">
            <textarea
              className="input"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
            />
            <button className="sendButton" type="submit" onClick={(event) => sendMessage(event)}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
