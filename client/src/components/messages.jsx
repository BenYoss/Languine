import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../styles/messages.css';
import Message from './message';

function Messages({ messages, name }) {
  return (
    <div>
      <ScrollToBottom>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
}

export default Messages;
