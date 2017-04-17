import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GRID_SIZE = 40;

class App extends Component {
	constructor() {
	  super(props);
		const board = new Board(19);

		this.state = { board };
	}

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
