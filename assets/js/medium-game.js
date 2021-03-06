// Variables for medium-game
const medGameGrid = document.querySelector('#board');
var medCardsSelected = [];
var medCardsSelectedId = [];
var medCardsRight = [];document.getElementById('medium-button').addEventListener('click', startMediumGame);

//Start up function for medium-game
function startMediumGame() {
    displayGame();
    createMedBoard();
    document.getElementById('reset').addEventListener('click', resetMedGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
    setInterval(setTimer, 1200);
}

const kittenCardsMedium = kittenCardsHard.slice(0,12);

// Game board. Credit: Ania Kubow. You-Tube
function createMedBoard() {
    // Credit for .sort method for shuffle: Marina Ferreira
    kittenCardsMedium.sort(() => 0.5 - Math.random());
    for (let i = 0; i < kittenCardsMedium.length; i++) {
        var medCard = document.createElement('img');
        medCard.setAttribute('src', './assets/images/kitten-card-back.png');
        medCard.setAttribute('data-id', i);
        // ScreenReader text
        medCard.setAttribute('alt', 'Card back, select to flip over');
        medCard.classList.add('col-4', 'col-lg-2', 'kittenMedCard');
        medCard.addEventListener('click', flipMedCard);
        medGameGrid.appendChild(medCard);
    }
}

// Flips cards and checks for match
function flipMedCard() {
    var medCardId = this.getAttribute('data-id');
    medCardsSelected.push(kittenCardsMedium[medCardId].name);
    medCardsSelectedId.push(medCardId);
    this.setAttribute('alt', kittenCardsMedium[medCardId].name);
    this.setAttribute('src', kittenCardsMedium[medCardId].img);
    if (medCardsSelected.length === 2) {
        checkMatch(); 
    } else if (medCardsSelected.length > 2) {
        this.setAttribute('src', './assets/images/kitten-card-back.png');
    }
    medCardsSelected.length = Math.min(medCardsSelected.length, 2);
}

// Check for  match. Credit: Ania Kubrow You-Tube
function checkMatch() {
    var medCards = document.querySelectorAll('img');
    const medCardOneId = medCardsSelectedId[0];
    const medCardTwoId = medCardsSelectedId[1];
    if (medCardsSelected[0] === medCardsSelected[1] && medCardOneId !== medCardTwoId) {
        medCardsRight.push(medCardsSelected);
        
        moveCounter();
        
        medCards[medCardOneId].removeEventListener("click", flipMedCard);
        medCards[medCardTwoId].removeEventListener("click", flipMedCard);
        // Match feedback
        medCards[medCardOneId].classList.add('match');
        medCards[medCardTwoId].classList.add('match');
    } else {
        moveCounter();
        // Credit for setTimeout: Free Code Camp
        setTimeout(changeCardBack, 400);
        function changeCardBack() {
            medCards[medCardOneId].setAttribute('src', './assets/images/kitten-card-back.png');
            medCards[medCardTwoId].setAttribute('src', './assets/images/kitten-card-back.png');

            medCards[medCardOneId].setAttribute('alt', 'Card back, select to flip over');
            medCards[medCardTwoId].setAttribute('alt', 'Card back, select to flip over');
        };
    }
    // Reset array
    medCardsSelected = [];
    medCardsSelectedId = [];
    resultDisplay.textContent = medCardsRight.length; 
    if (medCardsRight.length === kittenCardsMedium.length/2) {
        setTimeout(correctMedMatch, 200);    
    }
}

function correctMedMatch() {
    alert('Wow you Marvlous Moog, you found all the kittens. Why not try a harder setting.');
    resetMedGame();
}

// Resets medium-game
function resetMedGame() {
    medCardsSelected = [];
    medCardsSelectedId = [];
    medCardsRight = [];
    medCards = document.querySelectorAll('img');
    kittenCardsMedium.sort(() => 0.5 - Math.random());
    medCards.forEach((c) => {
        c.setAttribute('src', './assets/images/kitten-card-back.png');
        c.addEventListener('click', flipMedCard);
        // Removes feeback
        c.classList.remove('match');
    });
    resultDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
}