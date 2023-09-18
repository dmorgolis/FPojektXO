
const board = document.getElementById("board");
const result = document.getElementById("result");
const stats = document.getElementById("stats");
const humanVsHumanBtn = document.getElementById("humanVsHuman");
const humanVsComputerBtn = document.getElementById("humanVsComputer");
const newGameBtn = document.getElementById("newGame");
const resetStatsBtn = document.getElementById("resetStats");
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("className");
const checkbox = document.getElementById("checkbox");
const currentPlayerDiv = document.getElementById("currentPlayer");
const currentPlayerSpan = document.getElementById("currentPlayerSpan");


let currentPlayer = "X";
let gameOver = false;
let isHumanVsHuman = true; // מצב משחק נוכחי, התחלתי עם משחק אנושי למשחק
let playerXWins = 0;
let draws = 0;
let playerOWins = 0;

// הוסף מאזין ללחיצה על הכפתור
checkbox.addEventListener("change", () => {
if (menu.classList.contains("see")) {
menu.classList.remove("see");
} else {
menu.classList.add("see");
}
});


// Define the manu() function
function manu() {
  const mainMenu = document.getElementById("className");
  const VsComputerBt = document.getElementById("userVsComputer");
  const VsUserBt = document.getElementById("userVsUser");

  // Add click event listener for "User vs. Computer" button
  VsComputerBt.addEventListener("click", () => {
    isHumanVsHuman = false;
    mainMenu.classList.remove("see");
    resetGame();
  });

  // Add click event listener for "User vs. User" button
  VsUserBt.addEventListener("click", () => {
    isHumanVsHuman = true;
    mainMenu.classList.remove("see");
    resetGame();
  });

  // Show the main menu
  mainMenu.classList.add("see");
}

// Call the manu() function
manu();

// יצירת טבלה
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// חלונות והצגה
function handleCellClick(e) {
const cell = e.target;
if (!gameOver && cell.textContent === "") {
cell.textContent = currentPlayer;
cell.classList.add("taken");
if (checkWin()) {
result.textContent = `Player ${currentPlayer} wins!`;
gameOver = true;
updateStats(currentPlayer);
} else if (checkDraw()) {
result.textContent = "!תיקו";
gameOver = true;
updateStats("draw");
} else {
currentPlayer = currentPlayer === "X" ? "O" : "X";
currentPlayerSpan.textContent = currentPlayer;
currentPlayerSpan.style.color = "red";
if (!isHumanVsHuman && currentPlayer === "O") {
  setTimeout(() => {
    computerMove();
    currentPlayer = "X";
    currentPlayerSpan.textContent = currentPlayer;
    currentPlayerSpan.style.color = "red";
  }, 1000);
}
}
} else if (!gameOver) {
result.innerHTML =
'<span style="color: red;">התא הזה כבר תפוס. אנא בחר תא אחר.</span>';
}
}


// שורה שמציגה את תור השחקן
currentPlayerSpan.textContent = currentPlayer;

// פעולות המחשב
function computerMove() {
  const cells = document.querySelectorAll(".cell");
  const emptyCells = Array.from(cells).filter(
    (cell) => cell.textContent === ""
  );

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
    if (checkWin()) {
      result.textContent = `Player ${currentPlayer} wins!`; // כאן מציין את המנצח
      gameOver = true;
      updateStats(currentPlayer);
    } else if (checkDraw()) {
      result.textContent = "!תיקו";
      gameOver = true;
      updateStats("draw");
    } else {
      currentPlayer = "X"; // החלפתי את התור לאחר מהלך המחשב
    }
  }
}

// בדיקת נצחון
function checkWin() {
  const cells = document.querySelectorAll(".cell");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
  }

  return false;
}

// בדיקת תיקו
function checkDraw() {
  const cells = document.querySelectorAll(".cell");
  return Array.from(cells).every((cell) => cell.textContent !== "");
}

// תחילת משחק חדש
newGameBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "taken");
  });
  result.textContent = "";
  currentPlayer = "X";
  gameOver = false;
  if (!isHumanVsHuman && currentPlayer === "O") {
    setTimeout(() => {
      computerMove();
    }, 1000);
  }
});


// איפוס משחק
function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "taken");
  });
  result.textContent = "";
  currentPlayer = "X";
  gameOver = false;
  if (!isHumanVsHuman && currentPlayer === "O") {
    setTimeout(() => {
      computerMove();
    }, 1000);
  }
}
  

// ניקוד
resetStatsBtn.addEventListener("click", () => {
playerXWins = 0;
playerOWins = 0;
draws = 0;
updateStats("reset");

document.getElementById("playerXName").textContent = "אני";
document.getElementById("playerOName").textContent = "מחשב/שחקן";
});


// ניקוד
function updateStats(winner) {
  if (winner === "X") {
    playerXWins++;
  } else if (winner === "O") {
    playerOWins++;
  } else if (winner === "draw") {
    draws++;
  }
  stats.innerHTML = `
      <p>X Wins: ${playerXWins}</p>
      <p>תיקו: ${draws}</p>
      <p>O Wins: ${playerOWins}</p>
  `;
}

// איפוס תוצאות
resetStatsBtn.addEventListener("click", () => {
  playerXWins = 0;
  playerOWins = 0;
  draws = 0;
  updateStats("reset");
});


// I
createBoard();

// מקשים שחקן מול שחקן ושחקן מול מחשב
humanVsHumanBtn.addEventListener("click", () => {
  isHumanVsHuman = true;
  resetGame();
});

humanVsComputerBtn.addEventListener("click", () => {
  isHumanVsHuman = false;
  resetGame();
});
