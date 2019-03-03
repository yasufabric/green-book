import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnalogClock, { Themes } from 'react-analog-clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AnalogClock theme={Themes.dark} />
      </div>
    );
  }
}

export default App;
