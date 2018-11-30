import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty Chalkboard</a>
        <span className="userCount">{this.props.userCount} User(s) online</span>
      </nav>
    );
  }
}


export default Navbar;
