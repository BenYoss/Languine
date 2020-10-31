import React from 'react';
import '../../styles/message.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Nav } from 'react-bootstrap';
import { deleteMessage } from '../../helpers/helpers';

function Message({
  message, name, host, reloader, account,
}) {
  let isSentByCurrentUser = false;
  const imageTypes = ['.gif', '.png', '.jpg', '.tiff', '.eps'];
  const videoTypes = ['.mp4', '.mov', '.wmv', '.webm', '.ogg', '.mkv'];
  const nameUser = message.name_user;
  const thumbnailUser = message.thumbnail_user;
  const idUser = message.id_user;
  const {
    text, _id, timestamp,
  } = message;

  if (nameUser === name) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div>
        <div>
          {host === account ? (
            <p className="badge badge-primary sentText" style={{ marginLeft: '90%' }}>HOST</p>
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
                      <img src={text} alt="" width="45%" height="70%" />,
                    ];
                  }
                  return undefined;
                }).filter((value) => value !== undefined).pop()
                || videoTypes.map((vidType) => {
                  if (text.includes(vidType)) {
                    return (
                      <video width="420" height="240" src={text} type="video/mp4" controls>
                        <track kind="captions" />
                      </video>
                    );
                  }
                  return '';
                })
                : ''
            }
          </div>
          <img src={thumbnailUser} alt="" width="70" height="70" />
          <div className="d">
            <button className="messageText colorWhite" type="submit" onClick={() => deleteMessage(_id).then(() => { reloader(); }).catch((err) => console.error(err))}>x</button>
          </div>
        </div>
      </div>
    ) : (
      <div>

        <div>
          {host === idUser && account !== host ? (
            <p className="badge badge-primary sentText" style={{ marginLeft: '10%' }}>HOST</p>
          ) : ''}
        </div>
        <div className="messageContainer justifyStart">
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
          <Nav.Link href={`/user?id=${nameUser}`}>
            <img src={thumbnailUser} alt="" width="70" height="70" />
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
                    return [
                      <img src={text} alt="" width="45%" height="70%" />,
                    ];
                  }
                  return undefined;
                }).filter((value) => value !== undefined).pop()
                || videoTypes.map((vidType) => {
                  if (text.includes(vidType)) {
                    return (
                      <video width="420" height="240" src={text} type="video/mp4" controls>
                        <track kind="captions" />
                      </video>
                    );
                  }
                  return '';
                })
                : ''
            }
          </div>
          <p className="sentText pl-10">{nameUser}</p>
          <p className="date sentText pl-10">{moment(timestamp).fromNow()}</p>
        </div>
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
};

export default Message;
