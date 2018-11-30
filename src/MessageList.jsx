import React from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

/* renders message class based on message.type
allows for different styles on notifications
*/
export default function MessageList(props) {
  return (
    <main className='messages'>
      {props.messages.map((message) => {
        switch(message.type) {
          case 'incomingMessage':
          case 'postMessage':
            return (
              <Message
                key={message.id}
                username={message.username}
                content={message.content}
              />
            )

          case 'incomingNotification':
            return (
              <Notification
                content={message.content}
              />
            )
        }
      })
      }
    </main>
  );
}
