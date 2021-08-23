import React, { useEffect, useState } from 'react';
import query from 'query-string';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import crypto from 'crypto-js';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Button, Collapse } from 'react-bootstrap';
import InfoBar from './infoBar';
import Message from './message';
import Bucket from '../files/bucket';
import '../../styles/chat.css';
import {
  getMessages, getRoom, getBannedUsers,
} from '../../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

let socket;
const toggles = { text: true, upload: false };
const bannedUsers = {};

function Chat({ userType }) {
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

    const decryptRoom = crypto.AES.decrypt(crypto.enc.Hex.parse(room).toString(crypto.enc.Base64), 'room').toString(crypto.enc.Utf8);
    if (!decryptRoom.length) {
      window.location.href = '/404';
    }
    console.log(user, bannedUsers);
    if (user === bannedUsers[user]) {
      window.location.href = '/roomlist?banned=true';
    }
    console.log(decryptRoom);
    socket = io(process.env.SOCKET_HOST);
    setRoom(decryptRoom);
    setNameUser(user);
    setUserId(name);
    socket.emit('join', {
      name, room: decryptRoom, desc, pub,
    }, () => {
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [process.env.SOCKET_HOST, window.location.search]);

  const reloader = () => {
    const {
      room, name,
    } = query.parse(window.location.search);

    getRoom(crypto.AES.decrypt(crypto.enc.Hex.parse(room).toString(crypto.enc.Base64), 'room').toString(crypto.enc.Utf8))
      .then((roomData) => {
        const { _id } = roomData[0];
        console.log(roomData, 'this is data');
        setHost(roomData[0].id_host);
        getMessages(_id)
          .then((messageBlock) => {
            const storage = messageBlock;
            setMessages(storage);
            getBannedUsers(_id)
              .then((userData) => {
                userData.forEach((use) => {
                  if (use.id_user === name) {
                    bannedUsers[name] = true;
                    console.log('banned', name, userData);
                    setReload([]);
                  }
                });
              }).catch((err) => console.error(err));
          });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    setAccount(userType.id_google);
  }, [userType]);
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
                  bannedUsers={bannedUsers}
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

Chat.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Chat;
