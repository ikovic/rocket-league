import React, { Component } from 'react';
import withFirebase from './hoc/withFirebase';
import firebase from './firebase';
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

export default withFirebase(firebase)(App);
