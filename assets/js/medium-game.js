// Variables for moderate game
const medGameGrid = document.querySelector('#board');
var medCardsSelected = [];
var medCardsSelectedId = [];
var medCardsRight = [];document.getElementById('medium-button').addEventListener('click', startMediumGame);

// Start funcrion for medium-game
function startMediumGame() {
    displayGame();
    createModBoard();
    document.getElementById('reset').addEventListener('click', resetMedGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
 
}

const kittenCardsModerate = kittenCardsHard.slice(0,12);