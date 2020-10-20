import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import InfoBar from './infoBar';
import Message from './message';
import Bucket from '../files/bucket';
import '../../styles/chat.css';
import { getMessages, getRoom, getAccount } from '../../helpers/helpers';

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
    getAccount()
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

  const sendImage = (image) => {
    console.log('I am image', image);
    if (image) {
      socket.emit('sendMessage', image, () => setMessage(''));
      setMessage('');
    }
  };

  return (
    <div className="background">
      <div className="container">
        <InfoBar room={roomType} name={nameuser} host={host} account={account} />
        <div>
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
        </div>

        <div className="outercontainer message">
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
        <div className="outercontainer image">
          <Bucket sendMessage={sendImage} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
