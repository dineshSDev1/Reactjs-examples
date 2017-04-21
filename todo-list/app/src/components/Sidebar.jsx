import React, { Component } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar'>
        <div className='info'>
          <h1>React Todo List Example</h1>
          <h2>Using babel, webpack and sass</h2>
        </div>
      </div>
    );
  }
}