import React from 'react';
import '../styles/message.css';

function Message({ message: { name_user, text, thumbnail_user }, name }) {
  let isSentByCurrentUser = false;

  console.log(name_user, name);
  if (name_user === name) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{name}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{text}</p>
        </div>
        <img className="imgIcon" src={thumbnail_user} alt="" />
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <img className="imgIcon" src={thumbnail_user} alt="" />
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{name_user}</p>
      </div>
    )
  );
}

export default Message;
