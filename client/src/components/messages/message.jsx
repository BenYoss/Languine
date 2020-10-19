import React from 'react';
import '../../styles/message.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Nav } from 'react-bootstrap';
import { deleteMessage } from '../../helpers/helpers';

function Message({
  message: {
    name_user, text, thumbnail_user, _id, timestamp,
  }, name, host, reloader, account,
}) {
  let isSentByCurrentUser = false;
  const imageTypes = ['.gif', '.png', '.jpg', '.tiff', '.eps'];

  if (name_user === name) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div>
        <div>
          {host === account ? (
            <p style={{ marginLeft: '800px' }}>host</p>
          ) : ''}
        </div>
        <div className="messageContainer justifyEnd">
          <p className="date">{moment(timestamp).fromNow()}</p>
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            {
              text.includes('https://storage.googleapis.com/languine.appspot.com/')
                ? imageTypes.map((type) => {
                  if (text.includes(type)) {
                    return (
                      <img src={text} alt="" width="65%" height="90%" />
                    );
                  }
                  return '';
                })
                : (
                  <div>
                    <p className="messageText colorWhite">{text}</p>
                  </div>
                )
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
              text.includes('https://storage.googleapis.com/languine.appspot.com/')
                ? imageTypes.map((type) => {
                  if (text.includes(type)) {
                    return (
                      <img src={text} alt="" width="65%" height="90%" />
                    );
                  }
                  return '';
                })
                : (
                  <div>
                    <p className="messageText colorDark">{text}</p>
                  </div>
                )
            }
        </div>
        <p className="sentText pl-10">{name_user}</p>
        <p className="date">{moment(timestamp).fromNow()}</p>
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
