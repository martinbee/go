import _ from 'lodash';

const Board = (size) => {
  this.currentColor = Board.BLACK;
  this.size = size;
  this.board = this.createBoard(size);
  this.lastMovePassed = false;
  this.inAtari = false;
  this.attemptedSuicide = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

// Returns a size x size board with all entries set to Board.Empty
Board.proptotype.createBoard = (size) => {
  const board = [];

  for (let i = 0; i < size; i ++) {
    board[i] = [];

    for (let j = 0; j < size; j++) {
      board[i][j] = Board.EMPTY;
    }
  }

  return board;
}

// Switches the current player
Board.prototype.switchPlayer = () => {
  let { currentColor } = this;

  currentColor = currentColor === Board.BLACK ? Board.WHITE : Board.BLACK;
}

// Pass ability
Board.protoype.pass = () => {
  const { endGame, switchPlayer } = this;
  let { lastMovePassed } = this;

  if (lastMovedPassed) endGame();

  lastMovePassed = true;
  switchPlayer();
}

// Called when the game ends (both players have passed)
Board.protoype.endGame = () => console.log("Game Over");

// Attempt to place a stone at (i,j). Returns true if the move was legal
Board.prototype.play = (i, j) => {
  const { currentColor, getAdjacentIntersections, getGroup, switchPlayer } = this;
  let { attemptedSuicide, inAtari, board, lastMovePassed } = this;

  console.log(`Played at ${i}, ${j}.`);

  attemptedSuicide = inAtari = false;

  if (board[i][j] !== Board.EMPTY) return false;

  const color = board[i][j] = currentColor;
  const captured = [];
  const neighbors = getAdjacentIntersections(i, j);
  let atari = false

  neighbors.forEach(neighbor => {
    const state = board[neighbor[0]][neighbor[1]];

    if (state !== Board.EMPTY && state !== color) {
      const group = getGroup(neighbor[0], neighbor[1]);
      const liberties = group.liberties;

      console.log(group);

      if (liberties === 0)  {
        captured.push(group);
      } else if (liberties === 1)  {
        atari = true;
      }
    }
  });

  // detect suicide
  if (_.isEmpty(captured) && getGroup(i, j)["liberties"] === 0) {
    board[i][j] = Board.EMPTY;
    attemptedSuicide = true;

    // Look more into this, do we need a bool return here??
    return false;
  }

  captured.forEach(group => {
    group.stones.forEach(stone => board[stone[0]][stone[1]] = Board.EMPTY);
  });

  if (atari) inAtari = true;

  lastMovedPassed = false;
  switchPlayer();

  return true;
}
