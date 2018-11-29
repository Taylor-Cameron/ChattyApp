import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import UUID from 'uuid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      messages: [],
      currentUser: 'Anonymous'
    }
  }

  newName = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value) {
        this.setState({
          currentUser: event.target.value
        })
      }
    }
  }

  newMessages = (event) => {
    if (event.key === 'Enter') {
      const oldMessages = this.state.messages;
      const newMessage = {
        id: UUID(),
        username: this.state.currentUser,
        content: event.target.value
      }
      const socket = new WebSocket("ws://localhost:3001");
      socket.onopen = function (event) {
        socket.send(JSON.stringify(newMessage));
      }
      socket.onmessage = (event) => {
        var msg = JSON.parse(event.data);
        let messages = this.state.messages.concat(msg);
        this.setState({messages: messages})
      }
      console.log(newMessage);
      this.setState({
        messages: [...oldMessages, newMessage]
      });
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        < MessageList messages={this.state.messages} />
        < ChatBar currentUser={this.state.currentUser} newName={this.newName} newMessages={this.newMessages}/>
      </div>


    );
  }
}
