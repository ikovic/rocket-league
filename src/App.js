import React, { Component } from "react";
import { BracketGenerator } from "react-tournament-bracket";
import demoData from "./demoData";

class App extends Component {
  render() {
    return <BracketGenerator games={demoData} />;
  }
}

export default App;
