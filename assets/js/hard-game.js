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

// start up function for hard-game
function startHardGame() {
    displayGame();
    createHardBoard();
    document.getElementById('reset').addEventListener('click', resetHardGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
}
// Array of objects to be injected into the DOM used with .slice method for all games
const kittenCardsHard = [
    { name: 'kitten1', img: './assets/images/kitten1.png', },
    { name: 'kitten1', img: './assets/images/kitten1.png', },
    { name: 'kitten2', img: './assets/images/kitten2.png', },
    { name: 'kitten2', img: './assets/images/kitten2.png', },
    { name: 'kitten3', img: './assets/images/kitten3.png', },
    { name: 'kitten3', img: './assets/images/kitten3.png', },
    { name: 'kitten4', img: './assets/images/kitten4.png', },
    { name: 'kitten4', img: './assets/images/kitten4.png', },
    { name: 'kitten5', img: './assets/images/kitten5.png', },
    { name: 'kitten5', img: './assets/images/kitten5.png', },
    { name: 'kitten6', img: './assets/images/kitten6.png', },
    { name: 'kitten6', img: './assets/images/kitten6.png', },
    { name: 'kitten7', img: './assets/images/kitten7.png', },
    { name: 'kitten7', img: './assets/images/kitten7.png', },
    { name: 'kitten8', img: './assets/images/kitten8.png', },
    { name: 'kitten8', img: './assets/images/kitten8.png', },
    { name: 'kitten9', img: './assets/images/kitten9.png', },
    { name: 'kitten9', img: './assets/images/kitten9.png', },
];
