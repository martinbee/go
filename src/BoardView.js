export default function BoardView({ board, gridSize, onPlay }) {
  const intersections = [];

  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      const boardIntersection = BoardIntersection({
        board,
        row: i,
        col: j,
        onPlay,
        gridSize,
        color: board.board[i][j],
      });

      intersections.push(BoardIntersection);
    }
  }

  const totalBoardSize = board.size * gridSize;
  const style = { width: totalBoardSize, height: totalBoardSize };

  return (
    <div style={style} id="board">
      {intersections}
    </div>
  );
}
