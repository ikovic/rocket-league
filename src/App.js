import React, { Component } from 'react';
import Teams from './features/Teams';
import Tournament from './features/Tournament';

class App extends Component {
  render() {
    return (
      <div>
        <Teams />
        <Tournament />
      </div>
    );
  }
}

export default App;
