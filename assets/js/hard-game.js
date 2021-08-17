// Hides game until game difficulty level is selected
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('board').classList.add('no-display');
    document.getElementById('timer-and-home').classList.add('no-display');
    document.getElementById('board-content').classList.add('no-display');
});
// Variables for hard-game
const hardGameGrid = document.querySelector('#board');
var hardCardsSelected = [];
var hardCardsSelectedId = [];
var hardCardsRight = [];

document.getElementById('hard-button').addEventListener('click', startHardGame);
