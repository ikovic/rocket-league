import React, { Component } from 'react';
import { BracketGenerator } from 'react-tournament-bracket';
import Teams from './features/Teams';
import demoData from './demoData';

class App extends Component {
  render() {
    return (
      <div>
        <Teams />
        <BracketGenerator games={demoData} />
      </div>
    );
  }
}

export default App;
