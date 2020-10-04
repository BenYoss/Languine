import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../styles/messages.css';
import Message from './message';

function Messages({ messages, name }) {
  console.log(name, messages);
  return (
    <div>
      <ScrollToBottom>
        {messages.map((message) => (
          <div>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
}

export default Messages;
