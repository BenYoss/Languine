import React from 'react';
import '../styles/message.css';

function Message({ message: { user, text, img }, name }) {
  let isSentByCurrentUser = false;

  console.log(user, name);
  if (user === name) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{name}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{text}</p>
        </div>
        <img className="imgIcon" src={img} alt="" />
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <img className="imgIcon" src={img} alt="" />
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
    )
  );
}

export default Message;
