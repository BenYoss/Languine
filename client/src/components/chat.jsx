import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar';
import Message from './message';
import '../styles/chat.css';
import { getMessages, getRoom } from '../helpers/helpers';

let socket;

function Chat() {
  // const [username, setName] = useState('');
  const [nameuser, setUser] = useState('');
  const [roomType, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useState([]);

  useEffect(() => {
    const {
      name, room, user, desc,
    } = query.parse(window.location.search);

    socket = io('localhost:8080');
    // setName(name);
    setRoom(room);
    setUser(user);
    socket.emit('join', { name, room, desc }, () => {
      console.log(name, room, desc, reload, 'test');
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, ['localhost:8080', window.location.search]);

  useEffect(() => {
    const {
      room,
    } = query.parse(window.location.search);
    socket.on('message', () => {
      getRoom(room)
        .then((roomData) => {
          const { _id } = roomData[0];
          getMessages(_id)
            .then((messageBlock) => {
              console.log(messageBlock);
              const storage = messageBlock;
              // console.log(storage, 'STRAGE');
              setMessages(storage);
              setReload([]);
            });
        })
        .catch((err) => console.error(err));
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setMessage('');
    }
  };

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
        {/* <Messages messages={messages} name={nameuser} /> */}
        <div onChange={() => console.log('tst')}>
          {messages.map((messagee) => (
            <div key={Math.random()}>
              <Message message={messagee} name={nameuser} />
            </div>
          ))}
        </div>

        <div className="outercontainer">
          <form className="form">
            <textarea
              className="input"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
            />
            <button className="sendButton" type="submit" onClick={(event) => { sendMessage(event); setMessage(''); }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
