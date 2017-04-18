import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GRID_SIZE = 40;
const board = new Board(19);

class App extends Component {
  constructor() {
    super(props);

    this.state = { board };
    this.onBoardUpdate = this.onBoardUpdate.bind(this);
  }

  onBoardUpdate() {
    this.setState({ board });
  }

  render() {
    const { board } = this.state;

    return (
      <div className="App">
        <AlertView board={board} />
        <PassView board={board} />
        <BoardView board={board} gridSize={GRID_SIZE} onPlay={this.onBoardUpdate} />
      </div>
    );
  }
}

export default App;
