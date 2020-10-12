import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import InfoBar from './infoBar';
import Message from './message';
import '../../styles/chat.css';
import { getMessages, getRoom, getUser } from '../../helpers/helpers';

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
      name, room, user, desc, pub,
    } = query.parse(window.location.search);

    socket = io(process.env.SOCKET_HOST);
    // setName(name);
    setRoom(room);
    setNameUser(user);
    socket.emit('join', {
      name, room, desc, pub,
    }, () => {
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [process.env.SOCKET_HOST, window.location.search]);

  const reloader = () => {
    const {
      room,
    } = query.parse(window.location.search);

    getRoom(room)
      .then((roomData) => {
        const { _id } = roomData[0];
        setHost(roomData[0].id_host);
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
        <InfoBar room={roomType} name={nameuser} host={host} account={account} />
        <div>
          <p>
            <ScrollToBottom className="containermsg">
              {messages.map((messagee) => (
                <div key={Math.random()}>
                  <Message
                    message={messagee}
                    name={nameuser}
                    host={host}
                    reloader={reloader}
                    account={account}
                    reload={reload}
                  />
                </div>
              ))}
            </ScrollToBottom>
          </p>
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
