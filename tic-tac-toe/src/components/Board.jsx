export default function Board({ size, board, onTurns }) {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 3rem)` }}
    >
      {board.map((row, rowIdx) =>
        row.map((col, colIdx) => (
          <div
            className="cell"
            key={`${rowIdx}${colIdx}`}
            onClick={() => onTurns(rowIdx, colIdx)}
          >
            {col}
          </div>
        )),
      )}
    </div>
  );
}
