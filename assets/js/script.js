'use strict';

const buttons = document.querySelectorAll('.btn'),
    startingPage = document.querySelector('.starting-page'),
    startGame = document.querySelector('.start'),
    gameoverMessage = document.querySelector('.gameover-msg'),
    overlay = document.querySelector(".overlay"),
    closeMessage = document.querySelector('.close'),
    nameOfPlayer1 = document.getElementById('player1'),
    nameOfPlayer2 = document.getElementById('player2'),
    playerTurnMessage = document.querySelector('.player-turn'),
    player1 = 'X', player2 = 'O';
let currentPlayer = player1, gameOver = false, countClicks = 0;

playerTurnMessage.innerText = `${nameOfPlayer1.value}'s turn`;

// function to check winner
function checkForWinner() {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    // function to check all winning combos has all X's or O's
    for (let i in winningCombos) {
        const [a, b, c] = winningCombos[i];
        if (buttons[a - 1].innerText === currentPlayer && buttons[b - 1].innerText === currentPlayer && buttons[c - 1].innerText === currentPlayer) {
            return true;
        }
    }
}

// function to check for draw
function checkForDraw() {
    return countClicks === 9;
}

// function to handle a button click
function handleButtonClick(e) {
    if (e.target.innerText !== '' || gameOver) {
        return;
    }
    countClicks++;
    e.target.innerText = currentPlayer;
    playerTurnMessage.innerText = `${currentPlayer == player1 ? nameOfPlayer2.value.toUpperCase() : nameOfPlayer1.value.toUpperCase()}'s turn`;
    e.target.classList.add('player-selected');
    e.target.classList.add(e.target.innerText === player1 ? 'red' : 'green');
    if (checkForWinner()) {
        playerTurnMessage.innerText = `🏆 ${currentPlayer == player1 ? nameOfPlayer2.value.toUpperCase() : nameOfPlayer1.value.toUpperCase()} 🏆 wins!`
        gameOver = true;
        overlay.classList.toggle('active');
        gameoverMessage.innerText = `Congratulations! \n 🏆 ${currentPlayer === player1 ? nameOfPlayer1.value.toUpperCase() : nameOfPlayer2.value.toUpperCase()} 🏆 \n won this game.`;
        return;
    }
    if (checkForDraw()) {
        gameOver = true;
        playerTurnMessage.innerText = `Draw!`;
        overlay.classList.toggle('active');
        gameoverMessage.innerText = `Draw!`;
        return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// reset button functionality
function resetGame() {
    startingPage.classList.remove('hide');
    gameOver = false;
    countClicks = 0;
    currentPlayer = player1;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = '';
        buttons[i].classList.remove('player-selected');
        buttons[i].classList.remove('red');
        buttons[i].classList.remove('green');
    }
    overlay.classList.remove('active');
}
const resetButtons = document.querySelectorAll('.reset');
resetButtons.forEach((resetBtn) => {
    resetBtn.addEventListener('click', resetGame);
});

// game over close functionality
closeMessage.addEventListener('click', () => {
    overlay.classList.remove('active');
});

// Adding event listener to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// start game
function start() {
    startingPage.classList.add('hide');
}
startGame.addEventListener('click', start);

const input = document.querySelectorAll('input');
input.forEach(inp => {
    inp.addEventListener('click', () => inp.select());
})