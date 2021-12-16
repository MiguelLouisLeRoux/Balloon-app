import React, { Component } from 'react';
import HeaderComponent from './components/header';
import Request from './components/Request';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <>
        <HeaderComponent/>
        <Request/>
      </>
    );
  }
}
