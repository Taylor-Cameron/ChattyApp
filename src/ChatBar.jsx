import React from 'react';

/* chatbar renders the chatbar with text input boxes for username and messages */
export default function ChatBar(props) {
  return (
    <footer className='chatbar'>
      <input name='user' className='chatbar-username' placeholder='Your Name (Optional)' onKeyDown={props.newName}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyDown={props.newMessages}/>
    </footer>
  );
}
