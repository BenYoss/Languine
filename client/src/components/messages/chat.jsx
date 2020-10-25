import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Button, Collapse } from 'react-bootstrap';
import InfoBar from './infoBar';
import Message from './message';
import Bucket from '../files/bucket';
import '../../styles/chat.css';
import {
  getMessages, getRoom, getAccount, getUser,
} from '../../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

let socket;
const toggles = { text: true, upload: false };

function Chat() {
  const [nameuser, setNameUser] = useState('');
  const [roomType, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [host, setHost] = useState('');
  const [userId, setUserId] = useState('');
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
    setUserId(name);
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

  const toggleTabs = (type) => {
    if (type === 'text') {
      toggles.text = true;
      toggles.upload = false;
    } else {
      toggles.text = false;
      toggles.upload = true;
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
                  d={userId}
                />
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="btn-group mr-2" role="group">
          <Button type="button" className="btn-dark" onClick={() => { toggleTabs('text'); setReload([]); }}>Text</Button>
          <Button type="button" className="btn-dark" onClick={() => { toggleTabs('upload'); setReload([]); }}>Upload</Button>
        </div>
        <Collapse in={toggles.text}>
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
        </Collapse>
        <Collapse in={toggles.upload}>
          <div className="outercontainer image" key={Math.random()}>
            <Bucket sendMessage={sendImage} />
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default Chat;
