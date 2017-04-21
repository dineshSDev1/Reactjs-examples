import React, { Component } from 'react';
import '../../resources/scss/content.scss';
import Sidebar from './Sidebar.jsx';
import Todocontent from './Todocontent.jsx';

export default class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Sidebar></Sidebar>
        <Todocontent></Todocontent>
      </div>
    )
  }
}