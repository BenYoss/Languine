import React from 'react';
import '../../styles/message.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Nav } from 'react-bootstrap';
import { deleteMessage } from '../../helpers/helpers';

function Message({
  message: {
    name_user, text, thumbnail_user, _id, timestamp, id_user,
  }, name, host, reloader, account, d,
}) {
  let isSentByCurrentUser = false;
  const imageTypes = ['.gif', '.png', '.jpg', '.tiff', '.eps'];
  const videoTypes = ['.mp4', '.mov', '.wmv', '.webm', '.ogg', '.mkv'];

  if (name_user === name) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div>
        <div>
          {host === account ? (
            <p className="badge badge-primary sentText" style={{ marginLeft: '700px' }}>HOST</p>
          ) : ''}
        </div>
        <div className="messageContainer justifyEnd">
          <p className="date sentText pr-10">{moment(timestamp).fromNow()}</p>
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            {
              text.includes('https://') || text.includes('http://')
                ? (
                  <div>
                    <a className="messageText colorWhite" href={text}>{text}</a>
                  </div>
                ) : (
                  <div>
                    <p className="messageText colorWhite">{text}</p>
                  </div>
                )
            }
            {
              text.includes('https://') || text.includes('http://')
                ? imageTypes.map((type) => {
                  if (text.includes(type)) {
                    return [
                      <img src={text} alt="" width="65%" height="90%" />,
                    ];
                  }
                  return undefined;
                })[0]
                || videoTypes.map((vidType) => {
                  if (text.includes(vidType)) {
                    return (
                      <video width="420" height="240" src={text} type="video/mp4" controls />
                    );
                  }
                })
                : ''
            }
          </div>
          <img src={thumbnail_user} alt="" width="70" height="70" />
          <div className="d">
            <button className="messageText colorWhite" type="submit" onClick={() => deleteMessage(_id).then(() => { reloader(); }).catch((err) => console.error(err))}>x</button>
          </div>
        </div>
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <div>
          {host === id_user && account !== host ? (
            <p className="badge badge-primary sentText">HOST</p>
          ) : ''}
        </div>
        <div className="d">
          {host === account
            ? (
              <button
                className="messageText colorWhite 2"
                type="submit"
                onClick={() => deleteMessage(_id)
                  .then(() => { reloader(); }).catch((err) => console.error(err))}
              >
                x
              </button>
            ) : ''}
        </div>
        <Nav.Link href={`/user?id=${name_user}`}>
          <img src={thumbnail_user} alt="" width="70" height="70" />
        </Nav.Link>
        <div className="messageBox backgroundLight">
          {
              text.includes('https://') || text.includes('http://')
                ? (
                  <div>
                    <a className="messageText colorDark 2" href={text}>{text}</a>
                  </div>
                ) : (
                  <div>
                    <p className="messageText colorDark 2">{text}</p>
                  </div>
                )
            }
          {
              text.includes('https://') || text.includes('http://')
                ? imageTypes.map((type) => {
                  if (text.includes(type)) {
                    console.log(host, 'I AM HOST!', d, 'I AM DDDDDD');
                    return [
                      <img src={text} alt="" width="65%" height="90%" />,
                    ];
                  }
                  return undefined;
                }).filter((value) => value !== undefined).pop()
                || videoTypes.map((vidType) => {
                  if (text.includes(vidType)) {
                    return (
                      <video width="420" height="240" src={text} type="video/mp4" controls />
                    );
                  }
                })
                : ''
            }
        </div>
        <p className="sentText pl-10">{name_user}</p>
        <p className="date sentText pl-10">{moment(timestamp).fromNow()}</p>
      </div>
    )
  );
}

Message.propTypes = {
  message: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  reloader: PropTypes.element.isRequired,
  account: PropTypes.string.isRequired,
  d: PropTypes.string.isRequired,
};

export default Message;
