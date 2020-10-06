import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar';
import Message from './message';
import '../styles/chat.css';
import { getMessages, getRoom, getUser } from '../helpers/helpers';

let socket;

function Chat() {
  // const [username, setName] = useState('');
  const [nameuser, setNameUser] = useState('');
  const [roomType, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [host, setHost] = useState('');
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    const {
      name, room, user, desc,
    } = query.parse(window.location.search);

    socket = io('localhost:8080');
    // setName(name);
    setRoom(room);
    setNameUser(user);
    socket.emit('join', { name, room, desc }, () => {
      console.log(name, room, desc, reload, 'test');
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, ['localhost:8080', window.location.search]);

  const reloader = () => {
    const {
      room,
    } = query.parse(window.location.search);

    getRoom(room)
      .then((roomData) => {
        const { _id, id_host } = roomData[0];
        setHost(id_host);
        getMessages(_id)
          .then((messageBlock) => {
            const storage = messageBlock;
            setMessages(storage);
            setReload([]);
          });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUser()
      .then((userData) => {
        setAccount(userData.id_google);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    socket.on('message', () => {
      reloader();
    });
  }, []);

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
              <Message
                message={messagee}
                name={nameuser}
                host={host}
                reloader={reloader}
                account={account}
              />
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
