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
// Credit for timer functions: user efuzz on Stack Overflow.
var totalSeconds = 0;

function setTimer(){
    ++totalSeconds;
    var seconds = document.getElementById('seconds');
    seconds.innerHTML = pad(totalSeconds%60);
    var minutes = document.getElementById('minutes');
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val){
    var valString = val + '';
    if(valString.length < 2) {
        return '0' + valString;
    } else { return valString;
    }
}

// Variables for easy-game
const easyGameGrid = document.querySelector('#board');
const counter = document.querySelector('#count');
var easyCardsSelected = [];
var easyCardsSelectedId = [];
var easyCardsRight = [];

document.getElementById('easy-button').addEventListener('click', startEasyGame);

function startEasyGame() {
    displayGame();
    createEasyBoard();
    document.getElementById('reset').addEventListener('click', resetEasyGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
    
}

const kittenCardsEasy = kittenCardsMedium.slice(0, 6);

// Credit for function: Ania Kubow you-tube
function createEasyBoard() {
    // Credit for .sort method of shuffling: Marina Ferreira
    kittenCardsEasy.sort(() => 0.5 - Math.random());
    // game board id changed to fit in browser
    easyGameGrid.id = 'easyboard';
    for (let i = 0; i < kittenCardsEasy.length; i++) {
        var easyCard = document.createElement('img');
        easyCard.setAttribute('src', './assets/images/kitten-card-back.png');
        easyCard.setAttribute('data-id', i);
        // Add alt text to make sure screen reader users can also play the game
        easyCard.setAttribute('alt', 'Card back, select to flip over');
        easyCard.classList.add('col-6', 'col-lg-4', 'kittenCard');
        easyCard.addEventListener('click', flipEasyCard);
        easyGameGrid.appendChild(easyCard);
    }
}
