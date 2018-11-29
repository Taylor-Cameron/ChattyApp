import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map((message) => {
          switch(message.type) {
            case 'incomingMessage':
              return (
              <Message
                key={message.id}
                username={message.username}
                content={message.content}
              />)
            case 'postMessage':
            return (
              <Message
                key={message.id}
                username={message.username}
                content={message.content}
              />)
            case 'incomingNotification':
              return (
                <Notification
                  content={message.content}
                />)
          }
        })}
      </main>
    );
  }
}


export default MessageList;