import React from 'react';
import '../../styles/message.css';
import PropTypes from 'prop-types';
import { deleteMessage } from '../../helpers/helpers';

function Message({
  message: {
    name_user, text, thumbnail_user, _id, timestamp,
  }, name, host, reloader, account,
}) {
  let isSentByCurrentUser = false;

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
          <p className="date">{timestamp.slice(0, 9)}</p>
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
          <img className="imgIcon" src={thumbnail_user} alt="" />
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
        <img className="imgIcon" src={thumbnail_user} alt="" />
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{name_user}</p>
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
