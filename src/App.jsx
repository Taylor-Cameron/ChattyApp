import React, {Component} from 'react';
import UUID from 'uuid';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

/* creates app class with state for messages*/
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      messages: [],
      currentUser: 'Anonymous',
      userCount: 0
    }
  }
/* new name function listens for on click event of user text box,
sets state of current user to event value */
  handleNewName = (event) => {
    if (event.key === 'Enter' && event.target.value) {
        this.setState({
          currentUser: event.target.value
        })
        const newUser = {
          type: 'postNotification',
          content: (this.state.currentUser + ' has changed their name to ' + event.target.value)
        }
        this.socket.send(JSON.stringify(newUser));
      }
    }
/* listens  for on click event of message text box
sets state of newMessage and adds to state.messages array*/
  handleNewMessage = (event) => {
    if (event.key === 'Enter') {
      const oldMessages = this.state.messages;
      const newMessage = {
        type: 'postMessage',
        id: UUID(),
        username: this.state.currentUser,
        content: event.target.value
      }
      this.setState({
        messages: [...oldMessages, newMessage]
      });
      event.target.value = '';
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify(newMessage));
      }
    }
  }

  /* when the app.jsx is rendered create websocket
    this.socket on message sends data for (userCount change,
    userName change and message value change) to server
  */
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type === 'userCountChange') {
        this.setState({userCount: data.count});
      } else {
        const messages = this.state.messages.concat(data);
        this.setState({ messages: messages })
      }
    }
  }

  render() {
    return (
        <div>
          < Navbar userCount={this.state.userCount} />
          < MessageList messages={this.state.messages} />
          < ChatBar currentUser={this.state.currentUser} newName={this.handleNewName} newMessages={this.handleNewMessage} />
        </div>

    );
  }
}
