const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset-btn');

let board = Array(9).fill('');
let player = 'X';
let gameOver = false;

function printBoard() {
  boxes.forEach((box, index) => {
    box.textContent = board[index];
  });
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Tie';
}

function computerMove() {
  let emptyIndices = [];
  board.forEach((val, index) => {
    if (!val) emptyIndices.push(index);
  });

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

 

  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] === 'X' && board[b] === 'X' && !board[c]) {
      board[c] = 'O';
      return;
    }
    if (board[a] === 'X' && board[c] === 'X' && !board[b]) {
      board[b] = 'O';
      return;
    }
    if (board[b] === 'X' && board[c] === 'X' && !board[a]) {
      board[a] = 'O';
      return;
    }
  }



  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[move] = 'O';
}

function handleClick(event, index) {
  if (board[index] || gameOver) return;
  board[index] = player;
  let winner = checkWinner();

  if (winner) {
    gameOver = true;
    alert(winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`);
    return;
  }
  player = player === 'X' ? 'O' : 'X';

  if (player === 'O') {
    computerMove();
    printBoard();
    winner = checkWinner();

    if (winner) {
      gameOver = true;
      alert(winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`);
    }
    player = 'X';
  }
  printBoard();
}

boxes.forEach((box, index) => {
  box.addEventListener('click', (event) => handleClick(event, index));
});

resetBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  player = 'X';
  gameOver = false;
  printBoard();
});

printBoard();


