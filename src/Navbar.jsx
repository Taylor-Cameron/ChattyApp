import React from 'react';

export default function Navbar(props) {
  return (
    <nav className='navbar'>
      <a href='/' className='navbar-brand'>Chatty Chalkboard</a>
      <span className='userCount'>{props.userCount} User(s) online</span>
    </nav>
  );
}

