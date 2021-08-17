// Global variable across all versions of the game to display score counter
const resultDisplay = document.querySelector('#result');

// Inserts previously hidden content
function displayGame() {
    document.getElementById('board').classList.remove('no-display');
    document.getElementById('timer-and-home').classList.remove('no-display');
    document.getElementById('introduction').remove();
    document.getElementById('start-game').remove();
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
    setInterval(setTimer, 1200);
}

const kittenCardsEasy = kittenCardsMedium.slice(0, 6);

// Credit for function: Ania Kubow You-Tube
function createEasyBoard() {
    // Credit for .sort method shuffle: Marina Ferreira
    kittenCardsEasy.sort(() => 0.5 - Math.random());
    easyGameGrid.id = 'easyboard';
    for (let i = 0; i < kittenCardsEasy.length; i++) {
        var easyCard = document.createElement('img');
        easyCard.setAttribute('src', './assets/images/kitten-card-back.png');
        easyCard.setAttribute('data-id', i);
        // Screen Reader text
        easyCard.setAttribute('alt', 'Card back, select to flip over');
        easyCard.classList.add('col-6', 'col-lg-4', 'kittenCard');
        easyCard.addEventListener('click', flipEasyCard);
        easyGameGrid.appendChild(easyCard);
    }
}

// Flips cards and checks for match
function flipEasyCard() {
    var easyCardId = this.getAttribute('data-id'); 
    easyCardsSelected.push(kittenCardsEasy[easyCardId].name);
    easyCardsSelectedId.push(easyCardId);
    this.setAttribute('src', kittenCardsEasy[easyCardId].img);
    this.setAttribute('alt', kittenCardsEasy[easyCardId].name);
    if (easyCardsSelected.length === 2) {
        checkEasyMatch(); 
    } else if (easyCardsSelected.length > 2) {
        this.setAttribute('src', './assets/images/kitten-card-back.png');
    }
    easyCardsSelected.length = Math.min(easyCardsSelected.length, 2);
}

// Check for match. Credit: Ania Kubrow You-Tube
function checkEasyMatch() {
    var easyCards = document.querySelectorAll('img');
    const easyCardOneId = easyCardsSelectedId[0];
    const easyCardTwoId = easyCardsSelectedId[1];
    if (easyCardsSelected[0] === easyCardsSelected[1] && easyCardOneId !== easyCardTwoId) {
        easyCardsRight.push(easyCardsSelected);
        // Move counter
        moveCounter();
        easyCards[easyCardOneId].removeEventListener("click", flipEasyCard);
        easyCards[easyCardTwoId].removeEventListener("click", flipEasyCard);
        // Match feedback
        easyCards[easyCardOneId].classList.add('match');
        easyCards[easyCardTwoId].classList.add('match');
    } else {
        moveCounter();
        // Credit for setTimeout: Free Code Camp
        setTimeout(changeCardBack, 400);
        function changeCardBack() {
            easyCards[easyCardOneId].setAttribute('src', './assets/images/kitten-card-back.png');
            easyCards[easyCardTwoId].setAttribute('src', './assets/images/kitten-card-back.png');
            easyCards[easyCardOneId].setAttribute('alt', 'Card back, select to flip over');
            easyCards[easyCardTwoId].setAttribute('alt', 'Card back, select to flip over');
        };
    }
    // Reset array
    easyCardsSelected = [];
    easyCardsSelectedId = [];
    resultDisplay.textContent = easyCardsRight.length; 
    if (easyCardsRight.length === kittenCardsEasy.length/2) {
        setTimeout(correctEasyMatch, 200);        
    }
}

function correctEasyMatch() {
    alert('Wow Easy Tiger, you found all the kittens. Why not try a harder setting');
    resetEasyGame();
}




// Move counter
// Credit: Michelle Toscano. https://github.com/Michelle3334/freaky_memory/blob/master/assets/js/script.js
function moveCounter() {
    counter.innerHTML ++;
}

// Reset game
function resetEasyGame() {
    easyCardsSelected = [];
    easyCardsSelectedId = [];
    easyCardsRight = [];
    // Shuffle cards
    easyCards = document.querySelectorAll('img');
    kittenCardsEasy.sort(() => 0.5 - Math.random());
    easyCards.forEach((c) => {
        c.setAttribute('src', './assets/images/kitten-card-back.png');
        c.addEventListener('click', flipEasyCard);
        //Remove feedback
        c.classList.remove('match');
    });
    resultDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
}

// Reset timer
function resetTimer() {
    document.getElementById('seconds').innerHTML = `00`;
    document.getElementById('minutes').innerHTML = `00`;
    totalSeconds = `0`;
}