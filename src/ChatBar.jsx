import React, { Component } from 'react';

/* chatbar renders the chatbar with text input boxes for username and messages */
class ChatBar extends Component {

  render() {
      return (
        <footer className="chatbar">
          <input name="user" className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this.props.newName}/>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.newMessages}/>
        </footer>
      );
    }
}


export default ChatBar;