import React, {Component} from 'react';
import UUID from 'uuid';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Nav-bar.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      messages: [],
      currentUser: 'Anonymous',
      userCount: 0
    }
  }

  newName = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value) {
        this.setState({
          currentUser: event.target.value
        })
        const newUser = {
          type: 'postNotification',
          content: (this.state.currentUser + ' has changed their name to ' + event.target.value)
        }
        this.socket.send(JSON.stringify(newUser));
        console.log(newUser);
      }
    }
  }

  newMessages = (event) => {
    if (event.key === 'Enter') {
      const oldMessages = this.state.messages;
      const newMessage = {
        type: 'postMessage',
        id: UUID(),
        username: this.state.currentUser,
        content: event.target.value
      }
      console.log(newMessage);
      this.setState({
        messages: [...oldMessages, newMessage]
      });
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify(newMessage));
      }
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (event) {
      console.log(event);
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      var data = JSON.parse(event.data);
      if(data.type === 'userCountChange') {
        this.setState({userCount: data.count});
      } else {
        let messages = this.state.messages.concat(data);
        this.setState({ messages: messages })
      }
    }
  }


  render() {
    return (
      <div>
        < Navbar userCount={this.state.userCount}/>
        < MessageList messages={this.state.messages} />
        < ChatBar currentUser={this.state.currentUser} newName={this.newName} newMessages={this.newMessages}/>
      </div>


    );
  }
}
