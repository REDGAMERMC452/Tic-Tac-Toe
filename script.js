const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
const gameContainer = document.querySelector('.game-container');
const loadingScreen = document.querySelector('.loading-screen');
const bgMusic = document.getElementById('bg-music');
const popSound = document.getElementById('pop-sound');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning Conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.transform = "scale(1.2)";
    setTimeout(() => event.target.style.transform = "scale(1)", 150);

    popSound.currentTime = 0; // Reset pop sound
    popSound.play(); // Play sound when X or O is placed

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 😐";
    }
}

// Start Game After Loading
setTimeout(() => {
    loadingScreen.style.display = 'none';
    gameContainer.classList.remove('hidden');
    gameContainer.style.opacity = '1';
    gameContainer.style.transform = 'scale(1)';
    bgMusic.play();
}, 3000);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', () => location.reload());
