function getWinner(board, size) {
  // col
  for (let i = 0; i < size; i++) {
    let symbol = board[i][0];

    if (symbol) {
      let winner = true;

      for (let j = 1; j < size; j++) {
        if (symbol !== board[i][j]) {
          winner = false;
        }
      }

      if (winner) {
        return symbol;
      }
    }
  }

  // row
  for (let j = 0; j < size; j++) {
    let symbol = board[0][j];

    if (symbol) {
      let winner = true;

      for (let i = 1; i < size; i++) {
        if (symbol !== board[i][j]) {
          winner = false;
        }
      }

      if (winner) {
        return symbol;
      }
    }
  }

  // corss diagolan
  let symbol = board[0][0];
  if (symbol) {
    let winner = true;
    for (let i = 0; i < size; i++) {
      if (symbol !== board[i][i]) {
        winner = false;
      }
    }

    if (winner) {
      return symbol;
    }
  }

  return null;
}

export { getWinner };
