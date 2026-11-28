function getWinner(size, board) {
  // rows
  for (let i = 0; i < size; i++) {
    let symbol = board[i][0];
    let winner = true;

    for (let j = 1; j < size; j++) {
      let current = board[i][j];
      if (current !== symbol) {
        winner = false;
        break;
      }
    }

    if (winner) {
      return symbol;
    }
  }

  // cols
  for (let j = 0; j < size; j++) {
    let symbol = board[0][j];
    let winner = true;

    for (let i = 1; i < size; i++) {
      let current = board[i][j];
      if (current !== symbol) {
        winner = false;
        break;
      }
    }

    if (winner) {
      return symbol;
    }
  }

  // main diaglona
  let symbol = board[0][0];
  for (let i = 1; i < size; i++) {
    let winner = true;

    if (board[i][i] !== symbol) {
      winner = false;
      break;
    }

    if (winner) {
      return symbol;
    }
  }

  // cross dialgon

  return null;
}

export default getWinner;
