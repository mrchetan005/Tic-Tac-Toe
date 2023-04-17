'use strict';

const grid = document.getElementById('grid'),
    buttons = document.querySelectorAll('.btn'),
    gameoverMessage = document.querySelector('.gameover-msg'),
    overlay = document.querySelector(".overlay"),
    closeMessage = document.querySelector('.close'),
    player1 = 'X', player2 = 'O';
let currentPlayer = player1, gameOver = false;

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
    let count = 0;
    for (let val of buttons) {
        count += val.innerHTML !== '' ? 1 : 0;
    }
    return count === 9;
}

// function to handle a button click
function handleButtonClick(e) {
    if (e.target.innerText !== '' || gameOver) {
        return;
    }
    e.target.innerText = currentPlayer;
    e.target.classList.add('player-selected');
    e.target.classList.add(e.target.innerText === player1 ? 'red' : 'green');
    if (checkForWinner()) {
        gameOver = true;
        overlay.classList.toggle('active');
        gameoverMessage.innerText = `Congratulations! ${currentPlayer === player1 ? 'Player1' : 'Player2'} wins`;
        return;
    }
    if (checkForDraw()) {
        gameOver = true;
        overlay.classList.toggle('active');
        gameoverMessage.innerText = `Draw!`;
        return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// reset button functionality
function resetGame() {
    gameOver = false;
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