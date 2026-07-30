import React, { useState } from "react";
import { getWinner } from "./getWinner";

export default function TicTacToe({ size }) {
  const [board, setBoard] = useState(
    Array.from({ length: size }, (_, idx) => Array.from({ length: size })),
  );
  const [turnX, setTurnX] = useState(true);

  const winner = getWinner(board, size);
  function handleCell(row, col) {
    if (board[row][col] || winner) return;

    setTurnX((prev) => !prev);

    const newBoard = [...board];

    const marker = turnX ? "x" : "o";

    newBoard[row][col] = marker;

    setBoard(newBoard);
  }

  return (
    <div className="container">
      {/* grid */}
      <div
        className="baord-container"
        style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
      >
        {board.map((row, rowIdx) =>
          row.map((col, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="cell"
              onClick={() => handleCell(rowIdx, colIdx)}
            >
              {col}
            </div>
          )),
        )}
      </div>

      {/* status */}
      <p>
        Status:
        {winner ? `winner is ${winner}` : turnX ? "X's turn" : "O's turn"}
      </p>

      {/* button */}
      <button>reset</button>
    </div>
  );
}
