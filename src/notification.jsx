import React from 'react';

export default function Notification(props) {
  return (
    <div className='notification'>
      <span className='notification-content'><i>{props.content}</i></span>
    </div>
  );
}