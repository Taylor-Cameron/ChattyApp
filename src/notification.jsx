import React, { Component } from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="notification">
        <span className="notification-content"><i>{this.props.content}</i></span>
      </div>
    );
  }
}


export default Notification;