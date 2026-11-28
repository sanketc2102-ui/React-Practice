import React, { useState } from "react";
import Board from "./Board";
import getWinner from "./getWinnner";

export default function TicTacToe({ size = 3 }) {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => Array.from({ length: size }).fill(null)),
  );
  const [turnX, setTurnX] = useState(true);
  const winner = getWinner(size, board); // X, Y or draw
  const isDraw =
    !winner && board.every((row) => row.every((cell) => cell !== null));

  function handleTurns(rowIdx, colIdx) {
    if (board[rowIdx][colIdx] || winner) return;

    setBoard((prevBoard) =>
      prevBoard.map((row, ri) =>
        ri === rowIdx
          ? row.map((col, ci) => (ci === colIdx ? (turnX ? "x" : "o") : col))
          : row,
      ),
    );

    setTurnX((prevState) => !prevState);
  }

  const status = winner
    ? `${winner} wins`
    : isDraw
      ? "match draw"
      : turnX
        ? "X's turn"
        : "O's turn";

  return (
    <div className="container">
      <Board size={size} board={board} onTurns={handleTurns} />
      <p>status: {status} </p>
      <button>reset</button>
    </div>
  );
}
