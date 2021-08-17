// Global variable score counter
const resultDisplay = document.querySelector('#result');

// Removes how to play information inserts game
function displayGame() {
    document.getElementById('board').classList.remove('no-display');
    document.getElementById('timer-and-home').classList.remove('no-display');
    document.getElementById('introduction-section').remove();
    document.getElementById('start-game-prompt').remove();
    document.getElementById('board-content').classList.remove('no-display');
    setTimer();
}