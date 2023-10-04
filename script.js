/* script.js */

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cards = document.querySelectorAll('.card');
let score = 0;

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
    score++;
    updateScore();
    alert('¡Has encontrado una pareja! Puntos: ' + score);
    disableCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Puntos: ' + score;
}

/* script.js */

// Resto del código...

// Llama a la función para mezclar y reorganizar las cartas al cargar la página
shuffleAndDisplayCards();

function shuffleAndDisplayCards() {
    const gameBoard = document.getElementById('game-board');

    // Obtén todas las cartas y conviértelas en un array
    const cardsArray = Array.from(cards);

    // Mezcla las cartas
    cardsArray.sort(() => Math.random() - 0.5);

    // Elimina las cartas actuales del tablero
    gameBoard.innerHTML = '';

    // Agrega las cartas al tablero en el nuevo orden
    cardsArray.forEach(card => {
        gameBoard.appendChild(card);
    });
}
