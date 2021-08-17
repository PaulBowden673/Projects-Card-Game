// Variables for moderate game
const medGameGrid = document.querySelector('#board');
var medCardsSelected = [];
var medCardsSelectedId = [];
var medCardsRight = [];document.getElementById('medium-button').addEventListener('click', startMediumGame);

// Start funcrion for medium-game
function startMediumGame() {
    displayGame();
    createMedBoard();
    document.getElementById('reset').addEventListener('click', resetMedGame);
    counter.innerHTML = `0`;
    resultDisplay.innerHTML = `0`;
 
}

const kittenCardsModerate = kittenCardsHard.slice(0,12);

// Creates game board. Credit: Ania Kubow You-Tube
function createMedBoard() {
    KittenCardsMedium.sort(() => 0.5 - Math.random());
    for (let i = 0; i < kittenCardsMedium.length; i++) {
        var medCard = document.createElement('img');
        medCard.setAttribute('src', './assets/images/kitten-card-back.png');
        medCard.setAttribute('data-id', i);
        medCard.setAttribute('alt', 'Card back, select to flip over');
        medCard.classList.add('col-4', 'col-lg-2', 'kittenMedCard');
        medCard.addEventListener('click', flipModCard);
        medGameGrid.appendChild(modCard);
    }
}
// Flip cards and check for match
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

// Check for a match. Credit: Ania Kubrow You-Tube
function checkMatch() {
    var medCards = document.querySelectorAll('img');
    const medCardOneId = medCardsSelectedId[0];
    const medCardTwoId = medCardsSelectedId[1];
     if (medCardsSelected[0] === medCardsSelected[1] && medCardOneId !== medCardTwoId) {
        medCardsRight.push(medCardsSelected);
        //Move counter
        moveCounter();
    
        medCards[modCardOneId].removeEventListener("click", flipMedCard);
        medCards[modCardTwoId].removeEventListener("click", flipMedCard);
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